package controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	ListRequest "github.com/saegus/test-technique-romain-chenard/internal/modules/list/requests"
	ListResponse "github.com/saegus/test-technique-romain-chenard/internal/modules/list/responses"
	ListService "github.com/saegus/test-technique-romain-chenard/internal/modules/list/services"
	"github.com/saegus/test-technique-romain-chenard/pkg/utils"
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
	userIdStr, _ := userId.(string)

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
	userId, _ := c.Get("user_id")
	userIdStr, _ := userId.(string)
	fmt.Println("=> GET LISTS : ", userIdStr)

	lists, err := controller.listService.GetLists(userIdStr)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}
	fmt.Println("lists : ====> ")
	utils.PrettyDisplay(lists)
	c.JSON(http.StatusOK, ListResponse.ToListArrayResponse(lists))
}