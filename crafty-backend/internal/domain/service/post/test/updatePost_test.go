package post_test

import (
	"fmt"
	"testing"

	post "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/pkg/post"
	"github.com/stretchr/testify/assert"
)

// ValidPost from create post
//InvalidPost2 from delete post

func TestUpdatePost(t *testing.T) {
	ID, NewTPost := ValidPost()
	err1 := post.UpdatePost(NewTPost)
	AfterTPost, _ := post.GetPostById(ID)
	assert.Equal(t, nil, err1)
	assert.Equal(t, NewTPost, AfterTPost)

	ID2, NewTPost2 := InvalidPost2()
	BeforeTPost2, _ := post.GetPostById(ID2)
	err2 := post.UpdatePost(NewTPost2)
	AfterTPost2, _ := post.GetPostById(ID2)
	assert.Equal(t, fmt.Errorf("FailedToUpdatePost"), err2)
	assert.Equal(t, BeforeTPost2, AfterTPost2)
}
