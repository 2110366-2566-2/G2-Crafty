package post

import (
	"errors"
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

// not have list now
func HaveNil(Post model.TPost) bool {
	if Post.ID == "" {
		return true
	}
	if Post.Name == "" {
		return true
	}
	if Post.Detail == "" {
		return true
	}
	if Post.Content == "" {
		return true
	}
	if Post.CrafterID == "" {
		return true
	}
	if Post.Thumbnail.ThumbnailUrl == "" {
		return true
	}
	if Post.Thumbnail.ThumbnailType == "" {
		return true
	}
	return false
}

func (s *PostService) CreatePost(Post model.TPost) error {
	if HaveNil(Post) {
		return fmt.Errorf("FailedToCreatePost")
	} else {
		s.r.PostRepository.CreatePost(Post)
		return nil
	}
}

// Jinny
func (s *PostService) UpdatePost(Post model.TPost) error {
	return nil
}

// Jinny
func (s *PostService) DeletePost(ID string) error {
	post, err := s.r.PostRepository.GetPostById(ID)
	if err != nil {
		return err // Return error if GetPostById fails
	}

	// Check if the post exists
	if post.ID != "" {
		// Perform deletion operation in the database
		// DeletePostFromDatabase(ID)
		return nil // Return nil if deletion is successful
	}

	// Return error if the post does not exist
	return errors.New("post not found")
}

func (s *PostService) GetPostById(ID string) (model.TPost, error) {
	return model.TPost{}, nil
}
