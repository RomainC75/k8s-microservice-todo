package services

import (
	UserModel "github.com/saegus/test-technique-romain-chenard/internal/modules/user/models"
	UserRequest "github.com/saegus/test-technique-romain-chenard/internal/modules/user/requests"
)

type UserServiceInterface interface {
	CreateUserSrv (user UserRequest.SignupRequest) (UserModel.User, error) 
}
