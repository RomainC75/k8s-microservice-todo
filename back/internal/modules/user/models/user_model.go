package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	// -> ID, CreatedAt, UpdatedAt, DeletedAt
	ID       uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4()"`
	Email    string    `gorm:"varchar:191;unique"`
	Password string    `gorm:"varchar:191"`
	FirstName     string    `gorm:"varchar:191"`
	LastName     string    `gorm:"varchar:191"`
}
