package repo

import (
	db "shared/db/sqlc"
)

type IAuthRepo interface{
	SetUser(newUser db.CreateUserParams) (db.User,error)
	GetUser(userEmail string) (db.User, error)
}
