package controllers

import (
	"fmt"
	"net/http"

	UserRequests "github.com/saegus/test-technique-romain-chenard/internal/modules/user/requests"
	UserService "github.com/saegus/test-technique-romain-chenard/internal/modules/user/services"
	"github.com/saegus/test-technique-romain-chenard/pkg/encrypt"
	"github.com/saegus/test-technique-romain-chenard/pkg/utils"

	"github.com/gin-gonic/gin"
)

type Controller struct {
	userService UserService.UserServiceInterface
}

func New() *Controller {
	return &Controller{
		userService: UserService.New(),
	}
}

func (controller *Controller) HandleSignup(c *gin.Context) {
	var newUserReceived UserRequests.SignupRequest

	if err := c.ShouldBind(&newUserReceived); err != nil{
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}

	err := utils.PasswordConstrainsValidator(newUserReceived.Password)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}

	hashedPassword, err := encrypt.HashAndSalt(newUserReceived.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	newUserReceived.Password = hashedPassword

	fmt.Println("==> ", hashedPassword)
	recordedUser, err := controller.userService.CreateUserSrv(newUserReceived)

	c.JSON(http.StatusOK, gin.H{"message": recordedUser})
}
