package controller

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"shared/dto"
	"shared/utils"
	"shared/validate"

	"github.com/go-playground/validator/v10"
	"github.com/sirupsen/logrus"
)

type AuthCtrl struct {
	v *validator.Validate
	auth_base_url string
}

func NewAuthCtrl() *AuthCtrl{
	authServiceDomain:=os.Getenv("AUTH_MICROSERVICE_DOMAIN")
	namespace:=os.Getenv("NAMESPACE")
	authServicePort:= os.Getenv("AUTH_MICROSERVICE_PORT")
	AUTH_SERVICE_BASE_URL := fmt.Sprintf("http://%s.%s.svc.cluster.local:%s",authServiceDomain, namespace, authServicePort)
	return &AuthCtrl{
		v: validate.GetValidator(),
		auth_base_url: AUTH_SERVICE_BASE_URL,
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

	signupUrl := fmt.Sprintf("%s/signup", c.auth_base_url)
	request, err := http.NewRequest("POST", signupUrl, bytes.NewBuffer(b))
	if err != nil {
		logrus.Warnf("request error : %s\n", err.Error())
	}
	
	client := &http.Client{}
	response, err := client.Do(request)
	if err != nil {
		utils.SendErrorMessage(w, http.StatusInternalServerError, err)
		return
	}
	defer response.Body.Close()
	json:=utils.GetJsonFromBody(request.Body)

	fmt.Println("-> JSON : ", json)

	utils.SendJsonMessage(w, 200, dto.JSONMessage[string]{
		Error: false,
		Message: "",
		Data: json,
	})
}

func (c *AuthCtrl) HandleSignin(w http.ResponseWriter, r *http.Request){
	var u dto.UserSigninDto

	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		utils.SendErrorMessage(w, http.StatusBadRequest, err)
		return
	}

	err = c.v.Struct(u)
	if err != nil {
		utils.SendErrorMessage(w, http.StatusBadRequest, err)
		return
	}

	b, err := json.Marshal(u)
	if err != nil {
		utils.SendErrorMessage(w, http.StatusBadRequest, err)
		return
	}

	
	// authUrl := fmt.Sprintf("http://%s.%s.svc.cluster.local:%s/signin",authServiceDomain, namespace, authServicePort)
	signinUrl := fmt.Sprintf("%s/signin", c.auth_base_url)
	request, err := http.NewRequest("POST", signinUrl, bytes.NewBuffer(b))
	if err != nil {
		utils.SendErrorMessage(w, http.StatusInternalServerError, err)
		return
	}

	client := &http.Client{}
	response, err := client.Do(request)
	if err != nil {
		utils.SendErrorMessage(w, http.StatusInternalServerError, err)
		return
	}
	defer response.Body.Close()

	// modify the body head
	// jsonResp := utils.GetJsonFromBody(response.Body)
	// fmt.Println("--> GetJsonFromBody() : ", jsonResp)
	
	var t dto.JSONMessage[string]
	err = json.NewDecoder(response.Body).Decode(&t)
	if err != nil {
		fmt.Println("----- ERR EOF", err.Error())
		utils.SendErrorMessage(w, http.StatusInternalServerError, err)
		return 
	}

	utils.SendJsonMessage(w, http.StatusCreated, dto.JSONMessage[string]{
		Error: false,
		Message: t.Message,
		Data: t.Data,
	})
}