package routes

import "net/http"

func ConnectRoutes() *http.ServeMux{
	mux := http.NewServeMux()

	return mux
}