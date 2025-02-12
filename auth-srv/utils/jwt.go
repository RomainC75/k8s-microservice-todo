package auth_utils

import (
	db "auth-srv/db/sqlc"
	"os"
	"shared/utils"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func GenerateToken(user db.User) (string, error) {
	now := time.Now()
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":    strconv.FormatInt(user.ID, 10),
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

func GetClaimValues(claim jwt.MapClaims)(int64, string, error){
	utils.PrettyDisplay("claim ", claim)
	userId, err := strconv.ParseInt(claim["id"].(string), 10, 64)
	if err != nil {
		return 0, "", err
	}
	return userId, claim["email"].(string), err
}