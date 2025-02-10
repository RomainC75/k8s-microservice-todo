package services

import (
	repo "auth-srv/internal/repositories"
	auth_utils "auth-srv/utils"
	"database/sql"
	"errors"
	db "shared/db/sqlc"
	"shared/dto"

	"golang.org/x/crypto/bcrypt"
)

const COST=10

type AuthSrv struct {
	AuthRepo repo.IAuthRepo
}

func NewAuthSrv() *AuthSrv{
	return &AuthSrv{
		AuthRepo: repo.NewAuthRepo(),
	}
}

func (as *AuthSrv) CreateUserSrv(newUser db.CreateUserParams) (db.User, error){
	hashedPass, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), 10)
	if err != nil {
		return db.User{}, err
	}
	newUser.Password = string(hashedPass)
	return as.AuthRepo.SetUser(newUser)
}

func (as *AuthSrv) GetUserSrv(email string) (db.User, error){
	
	user, err := as.AuthRepo.GetUser(email)
	if err == sql.ErrNoRows{
		return db.User{}, errors.New("user not found")
	}
	return user, err
}

func (as *AuthSrv) Signin(user dto.UserSigninDto)(string, error){
	foundUser, err := as.AuthRepo.GetUser(user.Email)
	if err != nil {
		return "", err
	}

	err = bcrypt.CompareHashAndPassword([]byte(foundUser.Password), []byte(user.Password))
	if err != nil {
		return  "", err
	}
        
	token, err := auth_utils.GenerateToken(foundUser)
	if err != nil {
		return "", err
	}
	return token, nil
}