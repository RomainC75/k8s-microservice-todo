package requests

type SignupRequest struct {
	Email string `json:"email" binding:"required,email"`
	Password string `json:"email" binding:"required,min=8"`
	FirstName string `json:"firstname" binding:"required"`
	LastName string `json:"lastname" binding:"required"`
}

