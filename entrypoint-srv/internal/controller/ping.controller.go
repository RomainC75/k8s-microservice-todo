package controller

import (
	"fmt"
	"net/http"
)


func HandlePing(w http.ResponseWriter, r *http.Request){
	fmt.Fprintf(w,"Pong")
}