package responses

import (
	"github.com/google/uuid"
)

type LoginResponse struct {
	ID uuid.UUID
	Token string
}