package utils

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"shared/dto"
)

func SendJsonMessage[T any](w http.ResponseWriter, status int, content dto.JSONMessage[T]){
	b, _ := json.Marshal(content)
	fmt.Println("BYTES : ", string(b))
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	// json.NewEncoder(w).Encode(b)
	w.Write(b)
}

func SendJsonMessageWithDecode[T any](w http.ResponseWriter, status int, content dto.JSONMessage[T]){
	b, _ := json.Marshal(content)
	fmt.Println("BYTES : ", string(b))
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(b)
	// w.Write(b)
}

func SendErrorMessage(w http.ResponseWriter, status int, err error, customMessages ...string) {
	message := dto.JSONMessage[string]{
		Error: true,
		Message: "internal error",
		Data: err.Error(),
	}
	if len(customMessages)>0 {
		message.Message=customMessages[0]
	}
	// b, _ := json.Marshal(message)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(message)
}

func GetJsonFromBody(rawBody io.ReadCloser)string{
	var fullJson string
	scanner := bufio.NewScanner(rawBody)
    for i := 0; scanner.Scan() && i < 5; i++ {
		fullJson+=scanner.Text()
    }
    if err := scanner.Err(); err != nil {
        panic(err)
    }
	return fullJson
}