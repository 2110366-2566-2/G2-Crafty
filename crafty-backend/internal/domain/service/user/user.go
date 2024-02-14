package user

import (
	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/domain/model"
	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/repository"
)

type UserService struct {
	r *repository.Repositories
}

type IUserService interface {
	CreateUser(User model.TUser) error
	UpdateUser(User model.TUser) error
	DeleteUser(ID string) error
	GetUserById(ID string) (model.TUser, error)
}

func NewUserService(repository *repository.Repositories) IUserService {
	return &UserService{r: repository}
}
