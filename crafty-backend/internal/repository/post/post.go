package postRepo

import model "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/domain/model"

type IPostRepo interface {
	CreatePost(Post model.TPost) error
	UpdatePost(Post model.TPost) error
	DeletePost(ID string) error
	GetPostById(ID string) (model.TPost, error)
	GetPost(lowerfilter model.TPost, upperratingstar float32, upperprice float64, limit int) ([]model.TPost, error)
}
