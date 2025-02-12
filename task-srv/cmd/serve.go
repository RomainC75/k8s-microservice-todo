package cmd

import (
	"shared/dto"
	db "task-srv/db/sqlc"
	api "task-srv/internal"
	"task-srv/internal/routes"
)

func Serve(){
	dto.SetValidate()	
	db.Connect()

	mux := routes.ConnectRoutes()
	api.RunApi(mux)
}