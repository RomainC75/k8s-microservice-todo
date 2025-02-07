package utils

import (
	"os"
	db "shared/db/sqlc"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func GenerateToken(user db.User) (string, error) {
	now := time.Now()
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":    user.ID,
		"email": user.Email,
		"date": jwt.MapClaims{
			"createdAt": now.Unix(),
			"expiresAt": now.Add(time.Hour * 24).Unix(),
		},
	})

	JWTSECRET := os.Getenv("JWT_SECRET")
	return token.SignedString([]byte(JWTSECRET))
}

func ParseToken(tokenString string) (jwt.MapClaims, error) {
	JWTSECRET := os.Getenv("JWT_SECRET")
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(JWTSECRET), nil
	})

	if err != nil {
		return nil, err
	}
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims, nil
	}
	return nil, err
}
