package dto


type UserSignupDto struct {
	Email     string    `json:"email" validate:"required,email"`
	Password  string    `json:"password" validate:"required"`
	Firstname string    `json:"firstname" validate:"required"`
	Lastname  string    `json:"lastname" validate:"required"`
}