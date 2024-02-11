package model

type TThumbnail struct {
	ThumbnailUrl  string
	ThumbnailType string
}

type TReview struct {
	RatingStar float32
	Comment    string
	UID        string
}

type TPackage struct {
	Price float64
}

type TPost struct {
	ID          string
	Thumbnail   TThumbnail
	Name        string
	ReviewList  []TReview
	PackageList []TPackage
	Detail      string
	Content     string
	CrafterID   string
}
