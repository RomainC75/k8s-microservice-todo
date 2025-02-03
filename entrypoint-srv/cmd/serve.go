package cmd

import (
	"entrypoint-srv/config"
	api "entrypoint-srv/internal"
	"entrypoint-srv/internal/routes"
	"log"
)

func Serve(){
	err := config.SetEnv()
	if err != nil {
		log.Fatal(err.Error())
	}

	mux := routes.ConnectRoutes()

	routes.SetHelloRoutes(mux)
	routes.SetAuthRoutes(mux)
	
	api.RunApi(mux)
}