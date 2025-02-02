package services

import db "auth-srv/db/sqlc"

type IAuthSrv interface{
	CreateUserSrv(email string, password string) (db.User, error)
	GetUserSrv(email string) (db.User, error)
}