package middlewares

import (
	auth_utils "auth-srv/utils"
	"context"
	"errors"
	"net/http"
	"shared/utils"
	"strings"
)

func AuthMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        authorization := r.Header["Authorization"][0]
        splitted := strings.Split(authorization, " ")
        if len(splitted) != 2{
            utils.SendErrorMessage(w, http.StatusBadRequest,  errors.New("Header/Authorization malformed"))
            return
        }

        tokenString := splitted[1]
        claim, err  := auth_utils.ParseToken(tokenString)
        if err != nil {
            utils.SendErrorMessage(w, http.StatusBadRequest, err)
        }

        userId, userEmail, err := auth_utils.GetClaimValues(claim)
        if err != nil {
            utils.SendErrorMessage(w, http.StatusBadRequest, err)
        }

        ctx := context.WithValue(r.Context(), "user_email", userEmail)
        ctx = context.WithValue(ctx, "user_id", userId)
        r = r.WithContext(ctx)

        next.ServeHTTP(w, r)
    })
}