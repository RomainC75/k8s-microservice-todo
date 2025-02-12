package db

import (
	"context"
	"database/sql"
	"time"
)

const createTask = `-- name: CreateTask :one
INSERT INTO tasks (
    list_id, name, description, deadline, created_at, updated_at
) VALUES (
    $1, $2, $3, $4, NOW(), NOW()
)
RETURNING id, list_id, name, description, deadline, is_done, created_at, updated_at
`

type CreateTaskParams struct {
	ListID      int64          `json:"listId"`
	Name        string         `json:"name"`
	Description sql.NullString `json:"description"`
	Deadline    sql.NullTime   `json:"deadline"`
}

func (q *Queries) CreateTask(ctx context.Context, arg CreateTaskParams) (Task, error) {
	row := q.db.QueryRowContext(ctx, createTask,
		arg.ListID,
		arg.Name,
		arg.Description,
		arg.Deadline,
	)
	var i Task
	err := row.Scan(
		&i.ID,
		&i.ListID,
		&i.Name,
		&i.Description,
		&i.Deadline,
		&i.IsDone,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const deleteTask = `-- name: DeleteTask :exec
DELETE FROM tasks
WHERE id = $1 AND list_id = $2
`

type DeleteTaskParams struct {
	ID     int64 `json:"id"`
	ListID int64 `json:"listId"`
}

func (q *Queries) DeleteTask(ctx context.Context, arg DeleteTaskParams) error {
	_, err := q.db.ExecContext(ctx, deleteTask, arg.ID, arg.ListID)
	return err
}

const getTask = `-- name: GetTask :one

SELECT tasks.id, list_id, tasks.name, description, deadline, is_done, tasks.created_at, tasks.updated_at, lists.id, lists.name, user_id, lists.created_at, lists.updated_at FROM tasks
LEFT JOIN lists ON tasks.list_id = lists.id
WHERE lists.user_id = $1
`

type GetTaskRow struct {
	ID          int64          `json:"id"`
	ListID      int64          `json:"listId"`
	Name        string         `json:"name"`
	Description sql.NullString `json:"description"`
	Deadline    sql.NullTime   `json:"deadline"`
	IsDone      sql.NullBool   `json:"isDone"`
	CreatedAt   time.Time      `json:"createdAt"`
	UpdatedAt   time.Time      `json:"updatedAt"`
	ID_2        sql.NullInt64  `json:"id2"`
	Name_2      sql.NullString `json:"name2"`
	UserID      sql.NullInt64  `json:"userId"`
	CreatedAt_2 sql.NullTime   `json:"createdAt2"`
	UpdatedAt_2 sql.NullTime   `json:"updatedAt2"`
}

// SELECT * FROM tasks
// LEFT JOIN lists ON tasks.list_id = lists.id
// WHERE lists.user_id = $1 AND name = $2 LIMIT 1;
func (q *Queries) GetTask(ctx context.Context, userID int64) (GetTaskRow, error) {
	row := q.db.QueryRowContext(ctx, getTask, userID)
	var i GetTaskRow
	err := row.Scan(
		&i.ID,
		&i.ListID,
		&i.Name,
		&i.Description,
		&i.Deadline,
		&i.IsDone,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.ID_2,
		&i.Name_2,
		&i.UserID,
		&i.CreatedAt_2,
		&i.UpdatedAt_2,
	)
	return i, err
}

const updateTask = `-- name: UpdateTask :one
UPDATE tasks
SET 
    name = $1,
    description = $2,
    deadline = $3,
    is_done = $4,
    updated_at = NOW()
WHERE email = $1
RETURNING id, list_id, name, description, deadline, is_done, created_at, updated_at
`

type UpdateTaskParams struct {
	Name        string         `json:"name"`
	Description sql.NullString `json:"description"`
	Deadline    sql.NullTime   `json:"deadline"`
	IsDone      sql.NullBool   `json:"isDone"`
}

func (q *Queries) UpdateTask(ctx context.Context, arg UpdateTaskParams) (Task, error) {
	row := q.db.QueryRowContext(ctx, updateTask,
		arg.Name,
		arg.Description,
		arg.Deadline,
		arg.IsDone,
	)
	var i Task
	err := row.Scan(
		&i.ID,
		&i.ListID,
		&i.Name,
		&i.Description,
		&i.Deadline,
		&i.IsDone,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}
