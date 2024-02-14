package route

import (
	authMiddleware "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/app/user-api/middleware/auth"
	postRoute "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/app/user-api/pkg/post"
	uploadRoute "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/app/user-api/pkg/upload"
	userRoute "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/app/user-api/pkg/user"
	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/domain/service"
	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/repository"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type UserAPI struct {
	r *repository.Repositories
	s *service.ServiceRegistry
}

func SetupUserAPI(svc *service.ServiceRegistry, r *repository.Repositories) *UserAPI {
	// userAPI := userapi.NewUserAPI(repos.UserRepository)
	// userAPI.SetupRoute()
	return &UserAPI{s: svc, r: r}
}

func (api *UserAPI) SetupRoute(ro fiber.Router) error {

	ro.Use(cors.New(cors.Config{
		AllowOrigins: "http://127.0.0.1:8000, https://crafty.kuranasaki.work, http://localhost:3000",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
	}))

	authMW := authMiddleware.NewAuthMiddleware(api.r)
	userRouter := userRoute.NewUserRouter(api.s)
	userRouter.SetupRoute(ro.Group("/user", authMW.VerifyToken))
	uploadRouter := uploadRoute.NewUploadRouter(api.r)
	uploadRouter.SetupRoute(ro.Group("/upload", authMW.VerifyToken))

	postRouter := postRoute.NewPostRouter(api.s)
	postRouter.SetupRoute(ro.Group("/post/:postId", authMW.VerifyToken))
	return nil
}
