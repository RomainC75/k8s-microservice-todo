package routes

import (
	"auth-srv/internal/controller"
	"net/http"
)

func AuthRoutes(mux *http.ServeMux){
	authCtrl := controller.NewAuthCtrl()
	mux.HandleFunc("/signup",authCtrl.HandleSignup)
}