package model

type TAddress struct {
	Address_1   string
	Street      string
	Tambon      string
	Amphoe      string
	Province    string
	Postal_code string
}

type TUser struct {
	UID          string
	Username     string
	Phone_number string
	Address      TAddress
	PictureUrl   string
}
