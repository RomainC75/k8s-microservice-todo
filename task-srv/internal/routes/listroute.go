package routes

import (
	"net/http"
	"task-srv/internal/controller"
)

func AuthRoutes(mux *http.ServeMux){
	authCtrl := controller.NewListCtrl()
	mux.HandleFunc("POST /list",authCtrl.HandleCreateList)
	// others	
}