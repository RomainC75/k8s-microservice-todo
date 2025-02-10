package entrypoint_utils

import (
	"bytes"
	"encoding/json"
	"errors"
	"net/http"
	"shared/dto"
	"strconv"
	"strings"

	"github.com/sirupsen/logrus"
)


type MessageClient[T any] struct {
	method string
	url string
	contentB []byte
	token string
}

func NewMessageClient[T any](method string, url string, contentB []byte) *MessageClient[T]{
	return &MessageClient[T]{
		method: method,
		url: url,
		contentB: contentB,
	}
}

func (mc *MessageClient[T]) AddBearer(token string){
	mc.token = token
}

func (mc *MessageClient[T]) SendMessageRequest()(T, error){
	response, err := mc.sendRequest()
	if err != nil {
		logrus.Error("----> error : ", err.Error())
		var t T
		return t, err
	}
	defer response.Body.Close()

	isValid, err := checkIfErrorByStatus(response.Status)
	if !isValid {
		var errorM dto.JSONMessage[string]
		err = json.NewDecoder(response.Body).Decode(&errorM)
		var m T
		if err != nil {
			return m, err
		}
		return m, errors.New(errorM.ErrorMessage)
	}
	
	var m T
	err = json.NewDecoder(response.Body).Decode(&m)
	if err != nil {
		var m T
		return m, err
	}
	return m, err
}

func checkIfErrorByStatus(status string)(bool, error){
	logrus.Warn("status : ", status)
	code := strings.Split(status, " ")[0]

	intCode, err := strconv.Atoi(code)
	if err != nil {
		return false, err
	}
	if intCode>=200 && intCode<400 {
		return true, err
	}
	return false, err
}

func (mc *MessageClient[T])sendRequest() (*http.Response, error){
	request, err := http.NewRequest(mc.method, mc.url,  bytes.NewBuffer(mc.contentB))
	if err != nil {
		return nil, err
	}
	if len(mc.token)>0{
		request.Header.Set("Authorization", mc.token)
	}
	client := http.Client{}
	response, err := client.Do(request)
	
	if err != nil {
		return nil, err
	}
	return response, nil
}



