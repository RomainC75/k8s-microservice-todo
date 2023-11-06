package routes

import (
	// middlewares "github.com/saegus/test-technique-romain-chenard/internal/middleware"

	taskCtrl "github.com/saegus/test-technique-romain-chenard/internal/modules/task/controllers"

	"github.com/gin-gonic/gin"
)

func Routes(router *gin.Engine) {

	taskController := taskCtrl.New()
	guestGroup := router.Group("/todo/task")
	{
		guestGroup.POST("/:listId", taskController.CreateTask)
		// guestGroup.GET("/:listId", userController.HandleSignin)
		// guestGroup.PUT("/toggle/:taskId", userController.HandleSignin)
		// guestGroup.PUT("/:taskId", userController.HandleSignin)
		// guestGroup.DELETE("/:taskId", middlewares.IsAuth(), userController.Verify)
	}	
}
