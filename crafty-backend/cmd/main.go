package main

import (
	userAPI "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/app/user-api/route"
	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/repository"
	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/pkg/infrastructure"
	"github.com/gofiber/fiber/v2"
)

func main() {

	infra := infrastructure.NewInfrastructure()
	repos := repository.NewRepositories(infra)
	app := fiber.New()

	usrApi := userAPI.SetupUserAPI(repos)

	usrApi.SetupRoute(app)

}
