package controller

import (
	db "auth-srv/db/sqlc"
	"auth-srv/internal/dto"
	"auth-srv/internal/services"
	"encoding/json"
	"net/http"

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
		logrus.Warnf("validator error : %s \n", err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
}