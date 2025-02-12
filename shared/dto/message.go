package dto

type JSONMessage[D any] struct {
	Error bool `json:"error"`
	Message string `json:"message"`
	ErrorMessage string `json:"error_message"`
	Data D `json:"data"`
}

type WhoAmIMessage struct {
	UserEmail string `json:"userEmail"`
	UserId string `json:"userId"`
}