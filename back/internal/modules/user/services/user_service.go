package services

import (
	"fmt"

	UserModel "github.com/saegus/test-technique-romain-chenard/internal/modules/user/models"
	UserRepository "github.com/saegus/test-technique-romain-chenard/internal/modules/user/repositories"
	UserRequest "github.com/saegus/test-technique-romain-chenard/internal/modules/user/requests"
	SignupResponse "github.com/saegus/test-technique-romain-chenard/internal/modules/user/responses"
)

type UserService struct {
	userRepository UserRepository.UserRepositoryInterface
}

func New() *UserService{
	return &UserService{
		userRepository: UserRepository.New(),
	}
}

func (userService *UserService) CreateUserSrv (user UserRequest.SignupRequest) (UserModel.User, error){
	fmt.Println("=>", user)
	var newUser UserModel.User

	newUser.Email= user.Email
	newUser.Password= user.Password
	newUser.FirstName= user.FirstName
	newUser.LastName= user.LastName

	createdUser, err := userService.userRepository.CreateUser(newUser)
	if err != nil {
		return UserModel.User{}, err
	}
	SignupResponse.ToUser(createdUser)

	return createdUser, nil
}