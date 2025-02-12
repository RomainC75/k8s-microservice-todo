package db

import (
	"context"
)

const createList = `-- name: CreateList :one
INSERT INTO lists (
    name, user_id, created_at, updated_at
) VALUES (
    $1, $2, NOW(), NOW()
)
RETURNING id, name, user_id, created_at, updated_at
`

type CreateListParams struct {
	Name   string `json:"name" validate:"required"`
	UserID int64  `json:"userId" validate:"required"`
}

func (q *Queries) CreateList(ctx context.Context, arg CreateListParams) (List, error) {
	row := q.db.QueryRowContext(ctx, createList, arg.Name, arg.UserID)
	var i List
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.UserID,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const deleteList = `-- name: DeleteList :exec
DELETE FROM lists
WHERE id = $1 AND user_id = $2
`

type DeleteListParams struct {
	ID     int64 `json:"id"`
	UserID int64 `json:"userId"`
}

func (q *Queries) DeleteList(ctx context.Context, arg DeleteListParams) error {
	_, err := q.db.ExecContext(ctx, deleteList, arg.ID, arg.UserID)
	return err
}

const getListByName = `-- name: GetListByName :one
SELECT id, name, user_id, created_at, updated_at FROM lists
WHERE user_id = $1 AND name = $2 LIMIT 1
`

type GetListByNameParams struct {
	UserID int64  `json:"userId"`
	Name   string `json:"name"`
}

func (q *Queries) GetListByName(ctx context.Context, arg GetListByNameParams) (List, error) {
	row := q.db.QueryRowContext(ctx, getListByName, arg.UserID, arg.Name)
	var i List
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.UserID,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const listListsByUserId = `-- name: ListListsByUserId :many
SELECT id, name, user_id, created_at, updated_at FROM lists
WHERE user_id = $1
ORDER BY created_at
`

func (q *Queries) ListListsByUserId(ctx context.Context, userID int64) ([]List, error) {
	rows, err := q.db.QueryContext(ctx, listListsByUserId, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []List{}
	for rows.Next() {
		var i List
		if err := rows.Scan(
			&i.ID,
			&i.Name,
			&i.UserID,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateList = `-- name: UpdateList :one
UPDATE lists
SET 
    name = $3,
    updated_at = NOW()
WHERE id = $1 AND user_id = $2
RETURNING id, name, user_id, created_at, updated_at
`

type UpdateListParams struct {
	ID     int64  `json:"id"`
	UserID int64  `json:"userId"`
	Name   string `json:"name"`
}

func (q *Queries) UpdateList(ctx context.Context, arg UpdateListParams) (List, error) {
	row := q.db.QueryRowContext(ctx, updateList, arg.ID, arg.UserID, arg.Name)
	var i List
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.UserID,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}
