package api

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
)

func RunApi(mux *http.ServeMux){

	PORT := os.Getenv("AUTH_MICROSERVICE_PORT")

	fmt.Printf("--> Running on port %s\n", PORT)
	s := &http.Server{
		// TODO set variable as port
		Addr:           fmt.Sprintf(":%s", PORT),
		Handler:        mux,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
	err := s.ListenAndServe()
	
	if err != nil {
		log.Fatal(err)
	}
}