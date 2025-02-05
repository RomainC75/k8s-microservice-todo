package cmd

import (
	api "auth-srv/internal"
	"auth-srv/internal/dto"
	"auth-srv/internal/routes"
	db "shared/db/sqlc"
)

func Serve(){
	dto.SetValidate()	
	db.Connect()

	mux := routes.ConnectRoutes()
	api.RunApi(mux)
}