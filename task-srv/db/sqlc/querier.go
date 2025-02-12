package db

import (
	"context"
)

type Querier interface {
	CreateList(ctx context.Context, arg CreateListParams) (List, error)
	CreateTask(ctx context.Context, arg CreateTaskParams) (Task, error)
	DeleteList(ctx context.Context, arg DeleteListParams) error
	DeleteTask(ctx context.Context, arg DeleteTaskParams) error
	GetListByName(ctx context.Context, arg GetListByNameParams) (List, error)
	// SELECT * FROM tasks
	// LEFT JOIN lists ON tasks.list_id = lists.id
	// WHERE lists.user_id = $1 AND name = $2 LIMIT 1;
	GetTask(ctx context.Context, userID int64) (GetTaskRow, error)
	ListListsByUserId(ctx context.Context, userID int64) ([]List, error)
	UpdateList(ctx context.Context, arg UpdateListParams) (List, error)
	UpdateTask(ctx context.Context, arg UpdateTaskParams) (Task, error)
}

var _ Querier = (*Queries)(nil)
