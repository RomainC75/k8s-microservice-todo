package dto

type JSONResponse struct {
	Error bool `json:"error" validate:"boolean"`
	Message string `json:"message" validate:"string"`
	Data any `json:"data"`
}