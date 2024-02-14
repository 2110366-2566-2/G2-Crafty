package userAPI

import (
	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/domain/service"
	"github.com/gofiber/fiber/v2"
)

type UserRouter struct {
	s *service.ServiceRegistry
}

func NewUserRouter(svc *service.ServiceRegistry) *UserRouter {
	return &UserRouter{s: svc}
}

func (api *UserRouter) SetupRoute(ro fiber.Router) {
	handler := NewUserHandler(api.s)
	ro.Get("/", handler.GetUserInfo)
	ro.Put("/", handler.UpdateUser)
	ro.Delete("/", handler.DeleteUser)
}
