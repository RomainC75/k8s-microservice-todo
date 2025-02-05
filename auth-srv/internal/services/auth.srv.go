package services

import (
	repo "auth-srv/internal/repositories"
	db "shared/db/sqlc"
)


type AuthSrv struct {
	AuthRepo repo.IAuthRepo
}

func NewAuthSrv() *AuthSrv{
	return &AuthSrv{
		AuthRepo: repo.NewAuthRepo(),
	}
}

func (as *AuthSrv) CreateUserSrv(newUser db.CreateUserParams) (db.User, error){
	return as.AuthRepo.SetUser(newUser)
}

func (as *AuthSrv) GetUserSrv(email string) (db.User, error){
	return as.AuthRepo.GetUser(email)
}
