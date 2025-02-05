package cmd

import (
	"entrypoint-srv/config"
	api "entrypoint-srv/internal"
	"entrypoint-srv/internal/routes"
	"log"
	"shared/validate"
)

func Serve(){
	err := config.SetEnv()
	if err != nil {
		log.Fatal(err.Error())
	}

	validate.SetValidator()

	mux := routes.ConnectRoutes()

	routes.SetHelloRoutes(mux)
	routes.SetAuthRoutes(mux)
	
	api.RunApi(mux)
}