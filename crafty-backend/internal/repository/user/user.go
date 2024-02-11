package userRepo

import model "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/domain/model"

type IUserRepo interface {
	InsertUser(User model.TUser) error
	DeleteUser(UID string) error
	GetUserById(UID string) (model.TUser, error)
	UpdateUser(User model.TUser) error
}
