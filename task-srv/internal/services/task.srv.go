package services

import (
	db "task-srv/db/sqlc"
	repo "task-srv/internal/repositories"
)

const COST=10

type ListSrv struct {
	ListRepo repo.IListRepo
}

func NewListSrv() *ListSrv{
	return &ListSrv{
		ListRepo: repo.NewListRepo(),
	}
}

func (lr *ListSrv) CreateList(newList db.CreateListParams)(db.List, error){
	return lr.ListRepo.CreateList(newList)
}


func (lr *ListSrv) GetListsByUser(userId int64)([]db.List, error){
	return lr.ListRepo.GetListsByUserId(userId)
}

func (lr *ListSrv) UpdateList(listId int64, userId int64, newName string) (db.List, error){
	return lr.ListRepo.UpdateList(listId, userId, newName)
}

func (lr *ListSrv) DeleteList(listId int64, userId int64) error{
	return lr.ListRepo.DeleteList(listId, userId)
}