package main

import (
	_ "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/docs"
	userAPI "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/app/user-api/route"
	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/domain/service"
	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/repository"
	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/pkg/infrastructure"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	fiberSwagger "github.com/swaggo/fiber-swagger"
)

// @title CraftyUserAPI Documents
// @version 1.0.0
// @description This is an auto-generated API Docs.
// @termsOfService http://swagger.io/terms/
// @contact.name API Support
// @contact.email kongphop.c@kuranasaki.work
// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @schemes https
// @host crafty.kuranasaki.work
// @BasePath /api/v1

// FOR LOCAL //schemes http
// FOR LOCAL // host localhost:4000

// @in header
// @securitydefinitions.oauth2.password Firebase
// @tokenurl https://crafty.kuranasaki.work/api/v1/auth/oauth/token
// dfafasdf@tokenurl https://crafty.kuranasaki.work/api/v1/auth/oauth/token
// @scope.admin  All Permissions Granted
// @scope.mod All Permissions Except adding MOD
// @scope.user Permissions granted upto project owner

// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name Authorization
func main() {
	godotenv.Load(".local.env")
	infra := infrastructure.NewInfrastructure()
	repos := repository.NewRepositories(infra)
	svcs := service.NewServiceRegistry(repos)
	app := fiber.New(fiber.Config{
    BodyLimit: 100 * 1024 * 1024, //100MB
    StreamRequestBody:            true,
  })

	v1 := app.Group("/api/v1")

	usrApi := userAPI.SetupUserAPI(svcs, repos)
	usrApi.SetupRoute(v1)
	v1.Get("/docs/*", fiberSwagger.WrapHandler)
	app.Listen(":8000")

}
