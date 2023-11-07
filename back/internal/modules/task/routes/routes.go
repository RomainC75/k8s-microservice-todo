package routes

import (
	// middlewares "github.com/saegus/test-technique-romain-chenard/internal/middleware"

	"github.com/saegus/test-technique-romain-chenard/internal/middlewares"
	taskCtrl "github.com/saegus/test-technique-romain-chenard/internal/modules/task/controllers"

	"github.com/gin-gonic/gin"
)

func Routes(router *gin.Engine) {

	taskController := taskCtrl.New()
	guestGroup := router.Group("/todo/task")
	{
		guestGroup.POST("/:listId", middlewares.IsAuth(), taskController.CreateTask)
		guestGroup.GET("/:listId", middlewares.IsAuth(), taskController.GetTasks)
		// guestGroup.PUT("/toggle/:taskId", userController.HandleSignin)
		// guestGroup.PUT("/:taskId", userController.HandleSignin)
		// guestGroup.DELETE("/:taskId", middlewares.IsAuth(), userController.Verify)
	}	
}
