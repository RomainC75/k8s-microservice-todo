package routes

import "net/http"

func ConnectRoutes() *http.ServeMux{
	mux := http.NewServeMux()
	PingRoutes(mux)
	// AuthRoutes(mux)
	return mux
}