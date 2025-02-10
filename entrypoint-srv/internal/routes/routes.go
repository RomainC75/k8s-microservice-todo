package routes

import "net/http"

func ConnectRoutes() *http.ServeMux{
	mux := http.NewServeMux()

	SetHelloRoutes(mux)
	SetAuthRoutes(mux)
	
	return mux
}