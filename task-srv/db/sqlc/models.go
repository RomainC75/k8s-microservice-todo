package db

import (
	"database/sql"
	"time"
)

type List struct {
	ID        int64     `json:"id"`
	Name      string    `json:"name"`
	UserID    int64     `json:"userId"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type Task struct {
	ID          int64          `json:"id"`
	ListID      int64          `json:"listId"`
	Name        string         `json:"name"`
	Description sql.NullString `json:"description"`
	Deadline    sql.NullTime   `json:"deadline"`
	IsDone      sql.NullBool   `json:"isDone"`
	CreatedAt   time.Time      `json:"createdAt"`
	UpdatedAt   time.Time      `json:"updatedAt"`
}
