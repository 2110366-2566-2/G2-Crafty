package userAPI

import "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/domain/model"

type Address struct {
	Address_1  string `json:"address_1"`
	Street     string `json:"street"`
	Tambon     string `json:"tambon"`
	Amphoe     string `json:"amphoe"`
	Province   string `json:"province"`
	PostalCode string `json:"postal_code"`
}

type User struct {
	Username   string  `json:"username"`
	Phone      string  `json:"phone"`
	Address    Address `json:"address"`
	PictureUrl string  `json:"picture_url"`
}

func (u User) ToModel(uid string) model.TUser {
	return model.TUser{
		UID:          uid,
		Username:     u.Username,
		Phone_number: u.Phone,
		PictureUrl:   u.PictureUrl,
		Address: model.TAddress{
			Address_1:   u.Address.Address_1,
			Street:      u.Address.Street,
			Tambon:      u.Address.Tambon,
			Amphoe:      u.Address.Amphoe,
			Province:    u.Address.Province,
			Postal_code: u.Address.PostalCode,
		},
	}
}

type GetUserByIDRequest struct {
	ID string `json:"id"`
}

type GetUserByIDResponse struct {
	User  model.TUser `json:"user"`
	Error error       `json:"error"`
}

type UpdateUserRequest struct {
	User User `json:"user"`
}

type UpdateUserResponse struct {
	Message string `json:"message"`
	Error   string `json:"error"`
}
