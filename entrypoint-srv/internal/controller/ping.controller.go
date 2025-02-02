package controller

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"shared/utils"
)


func HandlePing(w http.ResponseWriter, r *http.Request){
	fmt.Println("/ping")
	fmt.Fprintf(w,"Pong")
}

func HandleAuthPing(w http.ResponseWriter, r *http.Request){
	fmt.Println("ping-auth")

	authServiceDomain:=os.Getenv("AUTH_MICROSERVICE_DOMAIN")
	namespace:=os.Getenv("NAMESPACE")
	authServicePort:= os.Getenv("AUTH_MICROSERVICE_PORT")

	url := fmt.Sprintf("http://%s.%s.svc.cluster.local:%s/ping",authServiceDomain, namespace, authServicePort)
	fmt.Println("-> url : ", url)
	resp, err := http.Get(url)
	if err!= nil{
		log.Fatal(err)
	}
	defer resp.Body.Close()
	json:=utils.GetJsonFromBody(resp.Body)
	utils.SendJson(w, 200, map[string]any{
		"ping response": json,
	})
}