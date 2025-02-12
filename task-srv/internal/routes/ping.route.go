package routes

import (
	"net/http"
	"task-srv/internal/controller"
)

func PingRoutes(mux *http.ServeMux){
	mux.HandleFunc("/ping",controller.HandlePing)
}