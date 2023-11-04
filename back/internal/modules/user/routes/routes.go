package routes

import (
	// middlewares "github.com/saegus/test-technique-romain-chenard/internal/middleware"
	userCtrl "github.com/saegus/test-technique-romain-chenard/internal/modules/user/controllers"

	"github.com/gin-gonic/gin"
)

func Routes(router *gin.Engine) {

	userController := userCtrl.New()
	guestGroup := router.Group("/auth")
	{
		guestGroup.POST("/signup", userController.HandleSignup)
		
	}	
}
