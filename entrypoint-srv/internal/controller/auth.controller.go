package controller

import (
	"bytes"
	"entrypoint-srv/config"
	"fmt"
	"net/http"
	"shared/utils"
)


func HandleSignup(w http.ResponseWriter, r *http.Request){
	envConfig := config.Getenv()
	
	authUrl := fmt.Sprintf("http://%s.%s.svc.cluster.local:%s/ping", envConfig[config.AUTH_MICROSERVICE_DOMAIN], envConfig[config.NAMESPACE], envConfig[config.AUTH_MICROSERVICE_PORT])

	res, err := http.NewRequest("POST", authUrl, bytes.NewBuffer([]byte("lkjsdf")))
	
	utils.SendJson(w, 200, map[string]any{
		"response": "hello",
	})
}