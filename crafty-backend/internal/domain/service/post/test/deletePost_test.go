package post_test

import (
	"fmt"
	"testing"

	post "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/pkg/post"
	repo "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/pkg/post/repo"
	"github.com/stretchr/testify/assert"
)

// ValidPost from create post

func InvalidPost2() (string, repo.TPost) {
	InvalidID := "invalid"
	InvalidTThumnail := repo.TThumbnail{
		ThumbnailUrl:  "invalid",
		ThumbnailType: "invalid",
	}
	InvalidTReview := repo.TReview{
		RatingStar: 0.0,
		Comment:    "invalid",
		UID:        "invalid",
	}
	InvalidTPackage := repo.TPackage{
		Price: 0.0,
	}
	InvalidTPost := repo.TPost{
		ID:          InvalidID,
		Thumbnail:   InvalidTThumnail,
		Name:        "invalid",
		ReviewList:  []repo.TReview{InvalidTReview},
		PackageList: []repo.TPackage{InvalidTPackage},
		Detail:      "invalid",
		Content:     "invalid",
		CrafterID:   "invalid",
	}

	return InvalidID, InvalidTPost
}

func TestDeletePost(t *testing.T) {
	//case ID is valid
	ID, _ := ValidPost()
	err1 := post.DeletePost(ID)
	assert.Equal(t, nil, err1)

	//case ID is invalid
	ID2, _ := InvalidPost2()
	err2 := post.DeletePost(ID2)
	assert.Equal(t, fmt.Errorf("InvalidID"), err2)
}
