package cmd

import (
	api "auth-srv/internal"
	"auth-srv/internal/routes"
)

func Serve(){
	mux := routes.ConnectRoutes()
	
	api.RunApi(mux)
}