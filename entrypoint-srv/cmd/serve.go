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
	
	api.RunApi(mux)
}