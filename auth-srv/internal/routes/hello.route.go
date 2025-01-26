package routes

import (
	"entrypoint-srv/internal/controller"
	"net/http"
)

func SetHelloRoutes(mux *http.ServeMux){
	mux.HandleFunc("/ping",controller.HandlePing)
}