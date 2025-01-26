package cmd

import (
	api "entrypoint-srv/internal"
	"entrypoint-srv/internal/routes"
)

func Serve(){
	mux := routes.ConnectRoutes()

	routes.SetHelloRoutes(mux)
	
	api.RunApi(mux)
}