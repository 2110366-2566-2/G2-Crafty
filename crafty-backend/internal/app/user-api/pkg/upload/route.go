package uploadAPI

import (
	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/repository"
	"github.com/gofiber/fiber/v2"
)

type UploadRouter struct {
  r *repository.Repositories
}

func NewUploadRouter(repos *repository.Repositories) *UploadRouter {
  return &UploadRouter{r: repos}
}

func (api *UploadRouter) SetupRoute(ro fiber.Router) {
  handler := NewUploadHandler(api.r)
  ro.Post("/", handler.Upload)
  ro.Delete("/", handler.Delete)
}