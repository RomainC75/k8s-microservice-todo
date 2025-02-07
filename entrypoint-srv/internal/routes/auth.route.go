package routes

import (
	"entrypoint-srv/internal/controller"
	"net/http"
)

func SetAuthRoutes(mux *http.ServeMux){
	authCtrl := controller.NewAuthCtrl()
	mux.HandleFunc("POST /auth/signup",authCtrl.HandleSignup)
	mux.HandleFunc("POST /auth/signin",authCtrl.HandleSignin)
}