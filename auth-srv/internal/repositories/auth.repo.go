package repo

import (
	db "auth-srv/db/sqlc"
	"context"
)

type AuthRepo struct {
	store *db.Store
}

func NewAuthRepo() *AuthRepo{
	return &AuthRepo{
		store: db.GetConnection(),
	}
}


func (ar *AuthRepo) SetUser(email string, password string) (db.User,error){
	createUserParams := db.CreateUserParams{
		Email: email,
		Password: password,
	}

	ctx := context.Background()
	return (*ar.store).CreateUser(ctx, createUserParams)
}

func (ar *AuthRepo) GetUser(userEmail string) (db.User, error){
	ctx := context.Background()
	return (*ar.store).GetUser(ctx, userEmail)
}