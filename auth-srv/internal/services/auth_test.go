package services

import (
	repo "auth-srv/internal/repositories"
	"database/sql"
	"fmt"
	db "shared/db/sqlc"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type MocksUserRepo struct {
	mock.Mock
}

func (r *MocksUserRepo) SetUser(newUser db.CreateUserParams) (db.User,error){
	ret := r.Called(newUser)
	return ret.Get(0).(db.User), ret.Error(1)
}

func (r *MocksUserRepo) GetUser(userEmail string) (db.User,error){
	ret := r.Called(userEmail)
	return ret.Get(0).(db.User), ret.Error(1)
}

func InitAuthSrv(authRep repo.IAuthRepo) IAuthSrv{
	service := new(AuthSrv)
	service.AuthRepo = authRep
	return service
}

// ============================================================================

func TestGetUserSrv(t *testing.T){
	// =============User found=============
	email := "user@email.com"
	user := db.User{
		ID: 1,
		Email: email,
		Password: "azerty",
		Firstname: "user", 
		Lastname: "email",
	}
	mockUserRepo := new(MocksUserRepo)
	mockUserRepo.On("GetUser", email).Return(user, nil)
	authSrv := InitAuthSrv(mockUserRepo)
	
	res, err := authSrv.GetUserSrv(email)
	fmt.Println("--> ", res)
	assert.Nil(t, err, "Error should be nil")
	assert.Equal(t, res.Email, email)
	
	// ============User not found==========
	mockUserRepo = new(MocksUserRepo)
	mockUserRepo.On("GetUser", email).Return(db.User{}, sql.ErrNoRows)
	authSrv = InitAuthSrv(mockUserRepo)

	_, err = authSrv.GetUserSrv(email)
	assert.EqualError(t, err, "user not found")
}


func TestCreateUserSrv(t *testing.T){
	newUser := db.CreateUserParams{
		Email: "user.email.com",
		Password: "azerty",
		Firstname: "user",
		Lastname: "email",
	}
	
	t.Run("successful creation", func(t *testing.T){
		
		mockerUserRepo := new(MocksUserRepo)
		mockerUserRepo.On("SetUser",db.CreateUserParams{
			Email: newUser.Email,
			Password: "fake",
			Firstname: newUser.Firstname,
			Lastname: newUser.Lastname,
		}).Return(db.User{
			Email: newUser.Email,
			Password: "fake",
			Firstname: newUser.Firstname,
			Lastname: newUser.Lastname,
		}, nil)
		authSrv := InitAuthSrv(mockerUserRepo)
		
		res, err := authSrv.CreateUserSrv(newUser)
		fmt.Println("-->", res)
		assert.NoError(t, err)
		assert.Equal(t, res.Email, newUser.Email)
		assert.NotEqual(t, res.Password, newUser.Password)
	})

}