package routes

import (
	"github.com/saegus/test-technique-romain-chenard/internal/middlewares"
	userRoutes "github.com/saegus/test-technique-romain-chenard/internal/modules/user/routes"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {
	router.Use(middlewares.CORSMiddleware())
	userRoutes.Routes(router)
}
