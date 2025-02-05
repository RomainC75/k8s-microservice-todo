package controller

import (
	"bytes"
	"encoding/json"
	"entrypoint-srv/dto"
	"fmt"
	"net/http"
	"os"
	"shared/utils"
	"shared/validate"

	"github.com/go-playground/validator/v10"
	"github.com/sirupsen/logrus"
)

type AuthCtrl struct {
	v *validator.Validate
}

func NewAuthCtrl() *AuthCtrl{
	return &AuthCtrl{
		v: validate.GetValidator(),
	}
}


func (c *AuthCtrl) HandleSignup(w http.ResponseWriter, r *http.Request){
	var u dto.UserSignupDto

	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = c.v.Struct(u)
	if err != nil {
		logrus.Warnf("validator error : %s \n", err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	b, err := json.Marshal(u)
	if err!= nil {
		logrus.Warnf("validator error : %s \n", err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// envConfig := config.Getenv()

	authServiceDomain:=os.Getenv("AUTH_MICROSERVICE_DOMAIN")
	namespace:=os.Getenv("NAMESPACE")
	authServicePort:= os.Getenv("AUTH_MICROSERVICE_PORT")
	authUrl := fmt.Sprintf("http://%s.%s.svc.cluster.local:%s/signup",authServiceDomain, namespace, authServicePort)
	
	// authUrl := fmt.Sprintf("http://%s.%s.svc.cluster.local:%s/test", envConfig[config.AUTH_MICROSERVICE_DOMAIN], envConfig[config.NAMESPACE], envConfig[config.AUTH_MICROSERVICE_PORT])
	
	fmt.Println("-----> authUrl := ", authUrl)
	request, err := http.NewRequest("POST", authUrl, bytes.NewBuffer(b))
	if err != nil {
		logrus.Warnf("request error : %s\n", err.Error())
	}
	
	client := &http.Client{}
	response, err := client.Do(request)
	if err != nil {
		// app.errorJSON(w, err)
		return
	}
	defer response.Body.Close()
	json:=utils.GetJsonFromBody(request.Body)

	fmt.Println("-> JSON : ", json)

	utils.SendJson(w, 200, map[string]any{
		"response": "hello",
	})
}