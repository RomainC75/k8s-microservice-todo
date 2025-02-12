package repo

import db "task-srv/db/sqlc"

type IListRepo interface{
	CreateList(newList db.CreateListParams) (db.List,error)
	GetListsByUserId(userId int64) ([]db.List, error)
	UpdateList(listId int64, userId int64, newName string) (db.List, error)
	DeleteList(listId int64, userId int64) error
}
