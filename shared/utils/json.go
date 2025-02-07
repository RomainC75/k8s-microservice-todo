package utils

import (
	"bufio"
	"encoding/json"
	"io"
	"net/http"
	"shared/dto"
)

func SendJson(w http.ResponseWriter, status int, content dto.JSONResponse){
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(content)
}

func SendError(w http.ResponseWriter, status int, err error) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(map[string]any{
		"error": err.Error(),
	})
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