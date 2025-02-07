package cmd

import (
	api "auth-srv/internal"
	"auth-srv/internal/routes"
	db "shared/db/sqlc"
	"shared/dto"
)

func Serve(){
	dto.SetValidate()	
	db.Connect()

	mux := routes.ConnectRoutes()
	api.RunApi(mux)
}