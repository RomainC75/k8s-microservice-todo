package controller

import (
	"fmt"
	"net/http"
)


func HandlePing(w http.ResponseWriter, r *http.Request){
	fmt.Println("-->Got a ping")
	fmt.Fprintf(w,"Pong/n")
}