package repo

import (
	db "auth-srv/db/sqlc"
)

type IAuthRepo interface{
	SetUser(email string, password string) (db.User,error)
	GetUser(userEmail string) (db.User, error)
}
