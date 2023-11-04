package repositories

import (
	models "github.com/saegus/test-technique-romain-chenard/internal/modules/user/models"
	UserRequest "github.com/saegus/test-technique-romain-chenard/internal/modules/user/requests"
)

type UserRepositoryInterface interface {
	CreateUser(user UserRequest.SignupRequest) (models.User, error)
}
