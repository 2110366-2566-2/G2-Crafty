package authMiddleware

import (
	"errors"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func (m *AuthMiddleware) VerifyToken(c *fiber.Ctx) error {
	authorization := c.Get("authorization")

	tokens := strings.Split(authorization, "Bearer ")
	length := len(tokens)
	if length != 2 {
		return c.Status(401).JSON(ErrorResponse{
			Message: "Invalid Token",
			Error:   errors.New("invalid Token format"),
		})
	}
	token := tokens[1]
	dtk, err := m.repos.AuthRepository.VerifyToken(token)
	if err != nil {
		return c.Status(401).JSON(ErrorResponse{
			Message: "Unauthorized",
			Error:   err,
		})
	}

	c.Locals("uid", dtk.UID)
	c.Next()
	return nil
}
