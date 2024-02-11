package post_test

import (
	"fmt"
	"testing"

	post "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/pkg/post"
	repo "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/pkg/post/repo"
	"github.com/stretchr/testify/assert"
)

// TestGetPostById tests the GetPostById function

// ValidPost() and InValidPost() from createPostTest
func TestGetPostById(t *testing.T) {
	// Scenario 1: Retrieving a post by a valid ID
	ID, ValidTPost := ValidPost()
	post1, err1 := post.GetPostById(ID)
	assert.Equal(t, ValidTPost, post1)
	assert.Nil(t, err1)

	// Scenario 2: Retrieving a post by an invalid ID
	InvalidTPost := InValidPost()
	post2, err2 := post.GetPostById(InvalidTPost)
	assert.Equal(t, repo.TPost{}, post2)
	assert.Equal(t, fmt.Errorf("FailedToGetPost"), err2)

	// Scenario 3: Retrieving a post by an empty ID
	emptyID := ""
	post3, err3 := post.GetPostById(emptyID)
	assert.Equal(t, repo.TPost{}, post3)
	assert.Equal(t, fmt.Errorf("FailedToGetPost"), err3)

	// Scenario 4: Retrieving a post that does not exist in the database
	nonExistingID := "999999"
	post4, err4 := post.GetPostById(nonExistingID)
	assert.Equal(t, repo.TPost{}, post4)
	assert.Equal(t, fmt.Errorf("FailedToGetPost"), err4)

}
