package services

import (
	repo "auth-srv/internal/repositories"
	db "shared/db/sqlc"

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
	return as.AuthRepo.GetUser(email)
}
