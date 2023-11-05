package controllers

import (
	"fmt"
	"net/http"

	UserService "github.com/saegus/test-technique-romain-chenard/internal/modules/user/services"

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

func (controller *Controller) CreateList(c *gin.Context) {
	userId, _ := c.Get("user_id")
	fmt.Println("id : ", userId)

	c.JSON(http.StatusOK, gin.H{"message": "createList"})
}

func (controller *Controller) GetLists(c *gin.Context) {

}