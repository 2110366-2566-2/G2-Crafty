package post

import "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/repository"

type PostService struct {
	r *repository.Repositories
}

func NewPostService(repository *repository.Repositories) *PostService {
	return &PostService{r: repository}
}
