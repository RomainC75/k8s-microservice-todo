package services

import (
	db "auth-srv/db/sqlc"
	repo "auth-srv/internal/repositories"
)


type AuthSrv struct {
	AuthRepo repo.IAuthRepo
}

func NewAuthSrv() *AuthSrv{
	return &AuthSrv{
		AuthRepo: repo.NewAuthRepo(),
	}
}

func (as *AuthSrv) CreateUserSrv(email string, password string) (db.User, error){
	return as.AuthRepo.SetUser(email, password)
}

func (as *AuthSrv) GetUserSrv(email string) (db.User, error){
	return as.AuthRepo.GetUser(email)
}
