package service

import (
	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/domain/service/post"
	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/domain/service/user"
	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/repository"
)

type ServiceRegistry struct {
  PostService post.IPostService
  UserService user.IUserService
}

func NewServiceRegistry(r *repository.Repositories) *ServiceRegistry {
  postService := post.NewPostService(r)
  userService := user.NewUserService(r)
  return &ServiceRegistry{
    PostService: postService,
    UserService: userService,
  }
}