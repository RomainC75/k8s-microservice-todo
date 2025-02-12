package db

import (
	"time"
)

type User struct {
	ID        int64     `json:"id"`
	Email     string    `json:"email"`
	Password  string    `json:"password"`
	Firstname string    `json:"firstname"`
	Lastname  string    `json:"lastname"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}
