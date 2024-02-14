package postAPI

import (
	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/domain/service"
	"github.com/gofiber/fiber/v2"
)

type PostRouter struct {
	// r *repository.Repositories
	s *service.ServiceRegistry
}

func NewPostRouter(svc *service.ServiceRegistry) *PostRouter {
	return &PostRouter{s: svc}
}

func (api *PostRouter) SetupRoute(ro fiber.Router) {
	handler := NewPostHandler(api.s)
	ro.Get("/:postId", handler.GetPostInfo)
	ro.Put("/", handler.UpdatePost)
	ro.Delete("/", handler.DeletePost)
	ro.Get("/list", handler.ListPost)
}
