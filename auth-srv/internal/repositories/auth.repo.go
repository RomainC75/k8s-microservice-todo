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


func (ar *AuthRepo) SetUser(newUser db.CreateUserParams) (db.User,error){
	ctx := context.Background()
	return (*ar.store).CreateUser(ctx, newUser)
}

func (ar *AuthRepo) GetUser(userEmail string) (db.User, error){
	ctx := context.Background()
	user, err := (*ar.store).GetUser(ctx, userEmail)
	
	return user, err
}