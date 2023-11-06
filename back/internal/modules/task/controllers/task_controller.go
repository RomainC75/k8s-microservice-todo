package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	ListService "github.com/saegus/test-technique-romain-chenard/internal/modules/list/services"
	TaskRequest "github.com/saegus/test-technique-romain-chenard/internal/modules/task/requests"
	TaskService "github.com/saegus/test-technique-romain-chenard/internal/modules/task/services"
)

type Controller struct {
	taskService TaskService.TaskServiceInterface
	listService ListService.ListServiceInterface
}

func New() *Controller {
	return &Controller{
		taskService: TaskService.New(),
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

	// taskId := c.Param("taskId")
	// foundList, err := controller.listService.

	recordedList, err := controller.taskService.CreateTask(newTask, userIdStr)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, recordedList)

	c.JSON(http.StatusUnprocessableEntity, gin.H{"error": "createtodo"})
}

