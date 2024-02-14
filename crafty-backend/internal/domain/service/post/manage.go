package post

import (
	"fmt"

	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/domain/model"
)

/*
	type IPost interface {
		CreatePost(Post postRepo.TPost) error
		UpdatePost(Post postRepo.TPost) error
		DeletePost(ID string) error
		GetPostById(ID string) (postRepo.TPost, error)
	}
*/

func IsValidPost(Post model.TPost) bool {
	if Post.ID == "" {
		return false
	}
	if Post.Name == "" {
		return false
	}
	if Post.Detail == "" {
		return false
	}
	if Post.Content == "" {
		return false
	}
	if Post.CrafterID == "" {
		return false
	}
	if Post.Thumbnail.ThumbnailUrl == "" {
		return false
	}
	if Post.Thumbnail.ThumbnailType == "" {
		return false
	}
	return true
}

func (s *PostService) CreatePost(Post model.TPost) error {

	if IsValidPost(Post) {
		err := s.r.PostRepository.CreatePost(Post)
		return err
	} else {
		return fmt.Errorf("Invalid Post")
	}
}

func (s *PostService) UpdatePost(Post model.TPost) error {
	_, err := s.r.PostRepository.GetPostById(Post.ID)
	if err != nil {
		return err // Return error if GetPostById fails
	}

	err = s.r.PostRepository.UpdatePost(Post)
	if err != nil {
		return err // Return error if the update operation fails
	}

	return nil // Return nil if the update operation is successful
}

func (s *PostService) DeletePost(ID string) error {
	post, err := s.r.PostRepository.GetPostById(ID)
	if err != nil {
		return err // Return error if GetPostById fails
	}

	if post.ID != "" {
		// Perform deletion operation in the database
		err := s.r.PostRepository.DeletePost(ID)
		if err != nil {
			return err // Return error if deletion operation fails
		}
		return nil // Return nil if deletion is successful
	}

	return fmt.Errorf("Post Not Found")
}

func (s *PostService) GetPostById(ID string) (model.TPost, error) {
	post, err := s.r.PostRepository.GetPostById(ID)
	if err != nil {
		return model.TPost{}, err // Return error if GetPostById fails
	}
	return post, err
}

func IsValidFilter(Post model.TPost) bool {
	if Post.ID != "" {
		return true
	}
	if Post.Name != "" {
		return true
	}
	if Post.Detail != "" {
		return true
	}
	if Post.Content != "" {
		return true
	}
	if Post.CrafterID != "" {
		return true
	}
	if Post.Thumbnail.ThumbnailUrl != "" {
		return true
	}
	if Post.Thumbnail.ThumbnailType != "" {
		return true
	}
	return false
}

func (s *PostService) GetPost(lowerfilter model.TPost, upperratingstar float32, upperprice float64, limit int) ([]model.TPost, error) {
	if limit >= 0 {
		posts, err := s.r.PostRepository.GetPost(lowerfilter, upperratingstar, upperprice, limit)
		if err != nil {
			return []model.TPost{}, err
		}
		return posts, err
	} else {
		return []model.TPost{}, fmt.Errorf("Invalid Limit")
	}
}
