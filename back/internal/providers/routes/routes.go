package routes

import (
	userRoutes "github.com/saegus/test-technique-romain-chenard/internal/modules/user/routes"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {
	userRoutes.Routes(router)
}
