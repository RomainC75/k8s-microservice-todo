package routes

import (
	"auth-srv/internal/controller"
	"auth-srv/internal/middlewares"
	"net/http"
)

func AuthRoutes(mux *http.ServeMux){
	authCtrl := controller.NewAuthCtrl()
	mux.HandleFunc("POST /signup",authCtrl.HandleSignup)
	mux.HandleFunc("POST /signin",authCtrl.HandleSignin)
	mux.Handle("GET /verify", middlewares.AuthMiddleware(http.HandlerFunc(authCtrl.WhoAmI)))
	
}