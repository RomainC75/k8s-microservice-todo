package services

import (
	db "auth-srv/db/sqlc"
	"shared/dto"
)

type IAuthSrv interface{
	CreateUserSrv(newUser db.CreateUserParams) (db.User, error)
	GetUserSrv(email string) (db.User, error)
	Signin(user dto.UserSigninDto)(string, error)
}