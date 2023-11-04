package controllers

import (
	"net/http"

	// UserService "github.com/saegus/test-technique-romain-chenard/internal/modules/user/services"

	"github.com/gin-gonic/gin"
)

type Controller struct {
	// userService UserService.UserServiceInterface
}

func New() *Controller {
	return &Controller{
		// userService: UserService.New(),
	}
}

func (controller *Controller) HandleSignup(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "register form"})
}
