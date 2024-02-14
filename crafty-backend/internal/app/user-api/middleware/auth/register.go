package authMiddleware

import (
	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/repository"
	"github.com/gofiber/fiber/v2"
)

type AuthMiddleware struct {
	repos *repository.Repositories
}

type IAuthMiddleware interface {
	VerifyToken(*fiber.Ctx) error
}

func NewAuthMiddleware(repos *repository.Repositories) IAuthMiddleware {
	return &AuthMiddleware{repos: repos}
}
