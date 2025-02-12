package repo

import (
	"context"
	db "task-srv/db/sqlc"
)

type ListRepo struct {
	store *db.Store
}

func NewListRepo() *ListRepo{
	return &ListRepo{
		store: db.GetConnection(),
	}
}


func (ar *ListRepo) CreateList(newList db.CreateListParams) (db.List,error){
	ctx := context.Background()
	return (*ar.store).CreateList(ctx, newList)
}

func (ar *ListRepo) GetListsByUserId(userId int64) ([]db.List, error){
	ctx := context.Background()
	return (*ar.store).ListListsByUserId(ctx,userId)
}

func (ar *ListRepo) UpdateList(listId int64, userId int64, newName string)(db.List, error){
	ctx := context.Background()
	uList := db.UpdateListParams{
		ID: listId,
		UserID: userId,
		Name: newName,
	}
	return (*ar.store).UpdateList(ctx, uList)
}

func (ar *ListRepo) DeleteList(listId int64, userId int64)error{
	ctx:= context.Background()
	dList := db.DeleteListParams{
		ID: listId,
		UserID: userId,
	}
	return (*ar.store).DeleteList(ctx, dList)
}