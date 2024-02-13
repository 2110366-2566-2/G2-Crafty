package repository

import (
	authRepo "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/repository/auth"
	postRepo "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/repository/post"
	storageRepo "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/repository/storage"
	userRepo "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/repository/user"
	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/pkg/infrastructure"
)

type Repositories struct {
	UserRepository userRepo.IUserRepo
	AuthRepository authRepo.IAuthRepo
	PostRepository postRepo.IPostRepo
	StorageRepository storageRepo.IStorageRepo
}

func NewRepositories(i *infrastructure.Infrastructure) *Repositories {
	return &Repositories{
		UserRepository: userRepo.NewMongoUserRepository(i),
		AuthRepository: authRepo.NewAuthRepository(i),
		StorageRepository: storageRepo.NewR2StorageRepo(i),
	}
}
