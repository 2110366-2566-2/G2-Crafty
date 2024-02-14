package user

import (
	"fmt"

	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/domain/model"
	// "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/pkg/user/repo/mongo"
)

// type IUser interface {
// 	CreateUser(User TUser) error
// 	GetUserById(UID string) (TUser, error)
// 	UpdateUser(User TUser) error
// 	DeleteUser(UID string) error
// }

func IsValidUser(User model.TUser) bool {
	if User.UID == "" {
		return false
	}
	if User.Username == "" {
		return false
	}
	if User.Phone_number == "" {
		return false
	}
	if User.Address.Address_1 == "" {
		return false
	}
	if User.Address.Street == "" {
		return false
	}
	if User.Address.Tambon == "" {
		return false
	}
	if User.Address.Amphoe == "" {
		return false
	}
	if User.Address.Province == "" {
		return false
	}
	if User.Address.Postal_code == "" {
		return false
	}
	if User.PictureUrl == "" {
		return false
	}
	return true
}

func (s *UserService) CreateUser(User model.TUser) error {

	if IsValidUser(User) {
		err := s.r.UserRepository.InsertUser(User)
		return err
	} else {
		return fmt.Errorf("Invalid User")
	}
}

func (s *UserService) GetUserById(UID string) (model.TUser, error) {
	user, err := s.r.UserRepository.GetUserById(UID)
	if err != nil {
		return model.TUser{}, err
	}
	return user, err
}

func (s *UserService) UpdateUser(User model.TUser) error {
	_,err := s.r.UserRepository.GetUserById(User.UID)
	if err!= nil {
        return err
    }

	err = s.r.UserRepository.UpdateUser(User)
	if err!= nil {
        return err
    }

	return nil
}

func (s *UserService) DeleteUser(UID string) error {
	user, err := s.r.UserRepository.GetUserById(UID)
	if err!= nil {
        return err
    }
	if user.UID!= "" {
		err = s.r.UserRepository.DeleteUser(UID)
        if err!= nil {
            return err
        }
		return nil // Return nil if deletion is successful

    }
	return fmt.Errorf("User Not Found")
}
