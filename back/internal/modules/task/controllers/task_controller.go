package controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	ListService "github.com/saegus/test-technique-romain-chenard/internal/modules/list/services"
	TaskRequest "github.com/saegus/test-technique-romain-chenard/internal/modules/task/requests"
	TaskResponse "github.com/saegus/test-technique-romain-chenard/internal/modules/task/responses"
	TaskService "github.com/saegus/test-technique-romain-chenard/internal/modules/task/services"
)

type Controller struct {
	taskService TaskService.TaskServiceInterface
	listService ListService.ListServiceInterface
}

func New() *Controller {
	return &Controller{
		taskService: TaskService.New(),
		listService: ListService.New(),
	}
}

func (controller *Controller) CreateTask(c *gin.Context) {
	userId, _ := c.Get("user_id")
	userIdStr, _ := userId.(string)

	var newTask TaskRequest.CreateTaskRequest
	if err := c.ShouldBind(&newTask); err != nil{
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}

	listId := c.Param("listId")
	foundList, err := controller.listService.GetList(listId)
	if  err != nil{
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}

	fmt.Printf("found LIst : ", foundList)

	if userIdStr != foundList.UserId.String(){
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": "not authorized to modify this list"})
		return
	}

	fmt.Printf("foundLIst : ", foundList)

	recordedList, err := controller.taskService.CreateTask(newTask, listId)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, recordedList)
}

func (controller *Controller) GetTasks(c *gin.Context) {
	userId, _ := c.Get("user_id")
	userIdStr, _ := userId.(string)

	listId := c.Param("listId")
	foundList, err := controller.listService.GetList(listId)
	
	if  err != nil{
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}
	
	if userIdStr != foundList.UserId.String(){
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": "not authorized to modify this list"})
		return
	}

	c.JSON(http.StatusOK, TaskResponse.ToTaskArrayResponse(controller.taskService.GetTasks(listId)))

}