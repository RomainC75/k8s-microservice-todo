package routes

import (
	"auth-srv/internal/controller"
	"net/http"
)

func PingRoutes(mux *http.ServeMux){
	mux.HandleFunc("/ping",controller.HandlePing)
}