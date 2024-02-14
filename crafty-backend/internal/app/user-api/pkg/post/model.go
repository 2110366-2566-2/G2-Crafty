package postAPI

import "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/domain/model"

type Thumbnail struct {
	ThumbnailUrl  string
	ThumbnailType string
}

type Review struct {
	RatingStar float32
	Comment    string
	UID        string
}

type Package struct {
	Price float64
}

type Post struct {
	ID          string
	Thumbnail   Thumbnail
	Name        string
	ReviewList  []Review
	PackageList []Package
	Detail      string
	Content     string
	CrafterID   string
}

func (p Post) ToModel(id string) model.TPost {
	tmpReviewList := []model.TReview{}
	for _, review := range p.ReviewList {
		tmpReviewList = append(tmpReviewList, model.TReview{
			RatingStar: review.RatingStar,
			Comment:    review.Comment,
			UID:        review.UID,
		})
	}
	tmpPackageList := []model.TPackage{}
	for _, packagef := range p.PackageList {
		tmpPackageList = append(tmpPackageList, model.TPackage{
			Price: packagef.Price,
		})
	}
	return model.TPost{
		ID: id,
		Thumbnail: model.TThumbnail{
			ThumbnailUrl:  p.Thumbnail.ThumbnailUrl,
			ThumbnailType: p.Thumbnail.ThumbnailType,
		},
		Name:        p.Name,
		ReviewList:  tmpReviewList,
		PackageList: tmpPackageList,
		Detail:      p.Detail,
		Content:     p.Content,
		CrafterID:   p.CrafterID,
	}
}

type GetPostByIDRequest struct {
	ID string `json:"id"`
}

type GetPostByIDResponse struct {
	Post  model.TPost `json:"post"`
	Error error       `json:"error"`
}

type UpdatePostRequest struct {
	Post Post `json:"post"`
}

type UpdatePostResponse struct {
	Message string `json:"message"`
	Error   string `json:"error"`
}

type ListPostResponse struct {
	Post  []model.TPost `json:"post"`
	Error error         `json:"error"`
}
