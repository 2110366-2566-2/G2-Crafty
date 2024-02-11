package userRepo

import (
	"context"
	"time"

	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/domain/model"
	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/pkg/infrastructure"
	"go.mongodb.org/mongo-driver/mongo"
)

type TMongoAddress struct {
	Address_1   string `bson:"address_1"`
	Street      string `bson:"street"`
	Tambon      string `bson:"tambon"`
	Amphoe      string `bson:"amphoe"`
	Province    string `bson:"province"`
	Postal_code string `bson:"postal_code"`
}

type TMongoUser struct {
	UID          string        `bson:"uid"`
	Username     string        `bson:"username"`
	Phone_number string        `bson:"phone_number"`
	Address      TMongoAddress `bson:"address"`
	PictureUrl   string        `bson:"picture_url"`
}

type MongoUserRepository struct {
	db *mongo.Collection
}

func NewMongoUserRepository(i *infrastructure.Infrastructure) IUserRepo {
	col := i.Database.NewMongodbCollection("user")
	return &MongoUserRepository{db: col}
}

func (user MongoUserRepository) InsertUser(User model.TUser) error {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	_, err := user.db.InsertOne(ctx, ConvertToMongoUser(User))
	return err
}

func (user MongoUserRepository) DeleteUser(UID string) error {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	_, err := user.db.DeleteOne(ctx, UID)
	return err
}

func (user MongoUserRepository) GetUserById(UID string) (model.TUser, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	var result TMongoUser
	err := user.db.FindOne(ctx, UID).Decode(&result)
	if err != nil {
		return model.TUser{}, err
	}
	return result.ToUser(), nil
}

func (user MongoUserRepository) UpdateUser(User model.TUser) error {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	_, err := user.db.ReplaceOne(ctx, User.UID, ConvertToMongoUser(User))
	return err
}

func (user MongoUserRepository) CreateUser(User model.TUser) error {
	return nil
}

func ConvertToMongoUser(user model.TUser) TMongoUser {
	return TMongoUser{
		UID:          user.UID,
		Username:     user.Username,
		Phone_number: user.Phone_number,
		Address:      ConvertToMongoAddress(user.Address),
		PictureUrl:   user.PictureUrl,
	}
}

func ConvertToMongoAddress(address model.TAddress) TMongoAddress {
	return TMongoAddress{
		Address_1:   address.Address_1,
		Street:      address.Street,
		Tambon:      address.Tambon,
		Amphoe:      address.Amphoe,
		Province:    address.Province,
		Postal_code: address.Postal_code,
	}
}

func (address TMongoAddress) ToAddress() model.TAddress {
	return model.TAddress{
		Address_1:   address.Address_1,
		Street:      address.Street,
		Tambon:      address.Tambon,
		Amphoe:      address.Amphoe,
		Province:    address.Province,
		Postal_code: address.Postal_code,
	}
}

func (user TMongoUser) ToUser() model.TUser {
	return model.TUser{
		UID:          user.UID,
		Username:     user.Username,
		Phone_number: user.Phone_number,
		Address:      user.Address.ToAddress(),
		PictureUrl:   user.PictureUrl,
	}
}
