package controller

import (
	db "shared/db/sqlc"
	"shared/utils"

	"auth-srv/internal/services"
	"encoding/json"
	"net/http"

	"shared/dto"

	"github.com/go-playground/validator/v10"
	"github.com/sirupsen/logrus"
)

type AuthCtrl struct {
	authSrv services.IAuthSrv
	v *validator.Validate
}

func NewAuthCtrl() *AuthCtrl{
	return &AuthCtrl{
		authSrv: services.NewAuthSrv(),
		v: dto.GetValidate(),
	}
}

func (ac *AuthCtrl) HandleSignup(w http.ResponseWriter, r *http.Request){
	var u db.CreateUserParams

	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = ac.v.Struct(u)
	if err != nil {
		utils.SendErrorMessage(w, http.StatusBadRequest, err)
		return
	}

	newUser, err := ac.authSrv.CreateUserSrv(u)
	if err != nil {
		logrus.Warnf("ERROR : %s \n", err.Error())
		utils.SendErrorMessage(w, http.StatusInternalServerError, err, "user could not be created !")
		return 
	}

	utils.SendJsonMessage(w, http.StatusCreated, dto.JSONMessage[db.User]{
		Error: false,
		Message: "user_created",
		Data: newUser,
	})
}

func (ac *AuthCtrl) HandleSignin(w http.ResponseWriter, r *http.Request){
	var u dto.UserSigninDto

	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	
	token, err := ac.authSrv.Signin(u)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	utils.SendJsonMessage(w, http.StatusOK, dto.JSONMessage[string]{
		Error: false,
		Message: "token",
		Data: token,
	})

	// foundUser, err := ac.authSrv.GetUserSrv()
}

func (ac *AuthCtrl) WhoAmI(w http.ResponseWriter, r *http.Request){

}