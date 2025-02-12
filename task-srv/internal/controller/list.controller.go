package controller

import (
	"shared/utils"

	"encoding/json"
	"net/http"
	db "task-srv/db/sqlc"
	"task-srv/internal/services"

	"shared/dto"

	"github.com/go-playground/validator/v10"
	"github.com/sirupsen/logrus"
)

type ListCtrl struct {
	listSrv services.IListSrv
	v *validator.Validate
}

func NewListCtrl() *ListCtrl{
	return &ListCtrl{
		listSrv: services.NewListSrv(),
		v: dto.GetValidate(),
	}
}

func (ac *ListCtrl) HandleCreateList(w http.ResponseWriter, r *http.Request){
	var u db.CreateListParams

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

	newUser, err := ac.listSrv.CreateList(u)
	if err != nil {
		logrus.Warnf("ERROR : %s \n", err.Error())
		utils.SendErrorMessage(w, http.StatusInternalServerError, err, "user could not be created !")
		return 
	}

	utils.SendJsonMessage(w, http.StatusCreated, dto.JSONMessage[db.List]{
		Error: false,
		Message: "user_created",
		Data: newUser,
	})
}

// func (ac *ListCtrl) HandleSignin(w http.ResponseWriter, r *http.Request){
// 	var u dto.UserSigninDto

// 	err := json.NewDecoder(r.Body).Decode(&u)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusBadRequest)
// 		return
// 	}
	
// 	token, err := ac.ListSrv.Signin(u)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	utils.SendJsonMessage(w, http.StatusOK, dto.JSONMessage[string]{
// 		Error: false,
// 		Message: "token",
// 		Data: token,
// 	})

// 	// foundUser, err := ac.ListSrv.GetUserSrv()
// }

// func (ac *ListCtrl) WhoAmI(w http.ResponseWriter, r *http.Request){
// 	userId := r.Context().Value("user_id")
// 	userEmail := r.Context().Value("user_email")

// 	_, err := ac.ListSrv.GetUserSrv(userEmail.(string))
// 	if err != nil {
// 		utils.SendErrorMessage(w, http.StatusBadRequest, err)
// 		return
// 	}
// 	utils.SendJsonMessage(w, http.StatusOK, dto.JSONMessage[map[string]any]{
// 		Error: false,
// 		Message: "jwt Data",
// 		Data: map[string]any{
// 			"userId": userId,
// 			"userEmail": userEmail,
// 		},
// 	})
// }