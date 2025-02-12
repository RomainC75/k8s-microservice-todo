package cmd

import (
	db "auth-srv/db/sqlc"
	api "auth-srv/internal"
	"auth-srv/internal/routes"
	"shared/dto"
)

func Serve(){
	dto.SetValidate()	
	db.Connect()
	

	mux := routes.ConnectRoutes()
	api.RunApi(mux)
}