package api

import (
	"fmt"
	"log"
	"net/http"
	"time"
)

func RunApi(mux *http.ServeMux){
	s := &http.Server{
		Addr:           ":3000",
		Handler:        mux,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
	fmt.Println("--> Running on port 3000")
	err := s.ListenAndServe()
	
	if err != nil {
		log.Fatal(err)
	}
}