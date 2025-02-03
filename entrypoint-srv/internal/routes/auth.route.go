package routes

import (
	"entrypoint-srv/internal/controller"
	"net/http"
)

func SetAuthRoutes(mux *http.ServeMux){
	mux.HandleFunc("POST /auth/signup",controller.HandleSignup)
}