package controllers

import (
	"fmt"
	"net/http"

	ListRequest "github.com/saegus/test-technique-romain-chenard/internal/modules/list/requests"
	ListService "github.com/saegus/test-technique-romain-chenard/internal/modules/list/services"

	"github.com/gin-gonic/gin"
)

type Controller struct {
	listService ListService.ListServiceInterface
}

func New() *Controller {
	return &Controller{
		listService: ListService.New(),
	}
}

func (controller *Controller) CreateList(c *gin.Context) {
	userId, _ := c.Get("user_id")
	userIdStr, ok := userId.(string)
	if !ok{
		fmt.Println("++++++++++++++++++++++++++++")
		fmt.Println("++++++++++++++++++++++++++++")
		fmt.Println("Error trying to get the userIdStr")
	}
	fmt.Println("id : ", userId)

	var newList ListRequest.CreateListRequest
	if err := c.ShouldBind(&newList); err != nil{
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}

	recordedList, err := controller.listService.CreateList(newList, userIdStr)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, recordedList)
}

func (controller *Controller) GetLists(c *gin.Context) {

}