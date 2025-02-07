package dto

type JSONMessage[D any] struct {
	Error bool `json:"error"`
	Message string `json:"message"`
	Data D `json:"data"`
}