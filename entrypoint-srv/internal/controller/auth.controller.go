package controller

import (
	"encoding/json"
	entrypoint_utils "entrypoint-srv/utils"
	"errors"
	"fmt"
	"net/http"
	"os"
	"shared/dto"
	"shared/utils"
	"shared/validate"
	"strings"

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

	signupUrl := fmt.Sprintf("%s/signupp", c.auth_base_url)
	messageClient := entrypoint_utils.NewMessageClient[dto.JSONMessage[map[string]any]]("POST", signupUrl, b)
	t, err := messageClient.SendMessageRequest()
	logrus.Warn("--> T", t)
	if err != nil {
		utils.SendErrorMessage(w, http.StatusInternalServerError, err)
		return
	}

	utils.SendJsonMessage(w, 200, dto.JSONMessage[map[string]any]{
		Error: false,
		Message: "",
		Data: t.Data,
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

	messageClient := entrypoint_utils.NewMessageClient[dto.JSONMessage[string]]("POST", signinUrl, b)
	t, err := messageClient.SendMessageRequest()
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

func (c *AuthCtrl)HandleWhoAmI(w http.ResponseWriter, r *http.Request){
	authorization := r.Header["Authorization"][0]
	splitter := strings.Split(authorization, " ")
	if len(splitter)!=2 || splitter[0]!="Bearer" {
		utils.SendErrorMessage(w, http.StatusBadRequest, errors.New("header/authorization malformed"))
		return
	}

	url := fmt.Sprintf("%s/verify", c.auth_base_url)
	messageClient := entrypoint_utils.NewMessageClient[dto.JSONMessage[map[string]any]]("GET", url, []byte{})
	messageClient.AddBearer(authorization)
	t, err := messageClient.SendMessageRequest()
	if err != nil {
		utils.SendErrorMessage(w, http.StatusInternalServerError, err)
		return
	}
	
	utils.SendJsonMessage(w, http.StatusAccepted, dto.JSONMessage[map[string]any]{
		Error: false,
		Message: "token information",
		Data: t.Data,
	})
}