package model

type Auth struct {
}

type DecodedToken struct {
	UID    string `json:"uid"`
	Claims Claims `json:"claims"`
}

type Claims struct {
	Registered bool `json:"registered"`
}
