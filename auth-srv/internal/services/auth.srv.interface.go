package services

import db "shared/db/sqlc"

type IAuthSrv interface{
	CreateUserSrv(newUser db.CreateUserParams) (db.User, error)
	GetUserSrv(email string) (db.User, error)
}