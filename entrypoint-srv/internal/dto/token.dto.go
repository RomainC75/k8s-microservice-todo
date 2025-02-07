package entrypoint_dto

type EntrypointDto struct {
	token string `json:"token" validate:"required"`
}