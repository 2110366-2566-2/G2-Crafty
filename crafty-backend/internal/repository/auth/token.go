package authRepo

import (
	"context"

	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/domain/model"
	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/pkg/infrastructure"
)

type AuthRepo struct {
	i *infrastructure.Infrastructure
}
type IAuthRepo interface {
	VerifyToken(token string) (model.DecodedToken, error)
}

func NewAuthRepository(i *infrastructure.Infrastructure) IAuthRepo {
	return &AuthRepo{
		i: i,
	}
}

func (r *AuthRepo) VerifyToken(token string) (model.DecodedToken, error) {
	auth := r.i.Firebase.GetAuth()
	tok, err := auth.VerifyIDToken(context.Background(), token)
	if err != nil {
		return model.DecodedToken{}, err
	}
	return model.DecodedToken{
		UID:    tok.UID,
		Claims: model.Claims{},
	}, nil
}
