package user

import "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/repository"

type UserService struct {
	r *repository.Repositories
}

func NewUserService(repository *repository.Repositories) *UserService {
	return &UserService{r: repository}
}
