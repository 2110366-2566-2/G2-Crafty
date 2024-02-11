package post_test

import (
	"testing"

	post "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/pkg/post"
	repo "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/pkg/post/repo"
	"github.com/stretchr/testify/assert"
)

func ValidPost() (string, repo.TPost) {
	ID := "123456"
	ValidTThumnail := repo.TThumbnail{
		ThumbnailUrl:  "www.123.com",
		ThumbnailType: "vedio",
	}
	ValidTReview := repo.TReview{
		RatingStar: 3.5,
		Comment:    "very good",
		UID:        "1",
	}
	ValidTPackage := repo.TPackage{
		Price: 450.0,
	}
	ValidTPost := repo.TPost{
		ID:          ID,
		Thumbnail:   ValidTThumnail,
		Name:        "tote bag handmade",
		ReviewList:  []repo.TReview{ValidTReview},
		PackageList: []repo.TPackage{ValidTPackage},
		Detail:      "Tote Bag - Black	",
		Content:     "Featuring a boxy shape marked by clean lines and a minimalist design, this Perline bag in black is a timeless piece that will never go out of style. It also comes fitted with a magnetic closure for easy access to your belongings.",
		CrafterID:   "456",
	}

	return ID, ValidTPost
}

func InValidPost() string {
	return "Failed to create post"
}

func TestCreatePost_Success(t *testing.T) {
	// Call the function to create a post
	ID, ValidTPost := ValidPost()
	post.CreatePost(ValidTPost)

	// have to call get
	post1, err1 := post.GetPostById(ID)
	assert.Equal(t, ValidTPost, post1)
	assert.Nil(t, err1)
}

func TestCreatePost_InvalidThumbnailURL(t *testing.T) {
	// Create post with invalid thumbnail URL
	invalidThumbnailPost := repo.TPost{
		Thumbnail: repo.TThumbnail{
			ThumbnailUrl:  "invalid_url",
			ThumbnailType: "video",
		},
	}
	err := post.CreatePost(invalidThumbnailPost)
	assert.Error(t, err) // Check if an error occurred
}

func TestCreatePost_EmptyName(t *testing.T) {
	// Create post with empty name
	emptyNamePost := repo.TPost{
		Name: "",
	}
	err := post.CreatePost(emptyNamePost)
	assert.Error(t, err) // Check if an error occurred
}

func TestCreatePost_EmptyContent(t *testing.T) {
	// Create post with empty content
	emptyContentPost := repo.TPost{
		Content: "",
	}
	err := post.CreatePost(emptyContentPost)
	assert.Error(t, err) // Check if an error occurred
}

func TestCreatePost_InvalidReview(t *testing.T) {
	// Create post with invalid review
	invalidReviewPost := repo.TPost{
		ReviewList: []repo.TReview{
			{RatingStar: 6.0}, // Rating greater than maximum allowed value
		},
	}
	err := post.CreatePost(invalidReviewPost)
	assert.Error(t, err) // Check if an error occurred
}

func TestCreatePost_NoCrafterID(t *testing.T) {
	// Create post without crafter ID
	noCrafterIDPost := repo.TPost{
		CrafterID: "",
	}
	err := post.CreatePost(noCrafterIDPost)
	assert.Error(t, err) // Check if an error occurred
}

func TestCreatePost_InvalidPackage(t *testing.T) {
	// Create post with invalid package
	invalidPackagePost := repo.TPost{
		PackageList: []repo.TPackage{
			{Price: -100.0}, // Negative price
		},
	}
	err := post.CreatePost(invalidPackagePost)
	assert.Error(t, err) // Check if an error occurred
}
