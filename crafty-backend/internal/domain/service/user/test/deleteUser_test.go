package model_test

import (
	"fmt"
	"testing"

	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/pkg/model"
	"github.com/go-playground/assert"
)

func ValidDeletedmodel() (string, model.Tmodel) {
	UID := "UidThatIsValid"
	ValidAddress := model.TAddress{
		Address_1:   "Address_1ThatIsValid",
		Street:      "StreetThatIsValid",
		Tambon:      "TambonThatIsValid",
		Amphoe:      "AmphoeThatIsValid",
		Province:    "ProvinceThatIsValid",
		Postal_code: "Postal_codeThatIsValid",
	}
	Validmodel := model.Tmodel{
		UID:          UID,
		modelname:    "modelnameThatIsValid",
		Phone_number: "PhoneNumberThatIsValid",
		Address:      ValidAddress,
		PictureUrl:   "PictureUrlThatIsValid",
	}
	return UID, Validmodel
}

func InvalidDeletedmodel() (string, model.Tmodel) {
	UID := "UidThatIsInvalid"
	ValidAddress := model.TAddress{
		Address_1:   "Address_1ThatIsValid",
		Street:      "StreetThatIsValid",
		Tambon:      "TambonThatIsValid",
		Amphoe:      "AmphoeThatIsValid",
		Province:    "ProvinceThatIsValid",
		Postal_code: "Postal_codeThatIsValid",
	}
	Validmodel := model.Tmodel{
		UID:          UID,
		modelname:    "modelnameThatIsValid",
		Phone_number: "PhoneNumberThatIsValid",
		Address:      ValidAddress,
		PictureUrl:   "PictureUrlThatIsValid",
	}
	return UID, Validmodel
}

func TestDeletemodel(t *testing.T) {
	//case UID is valid
	DeletedUID, _ := ValidDeletedmodel()
	err1 := model.Deletemodel(DeletedUID)
	assert.Equal(t, nil, err1)

	//case UID is invalid
	DeletedUID2, _ := ValidDeletedmodel()
	err2 := model.Deletemodel(DeletedUID2)
	assert.Equal(t, fmt.Errorf("UID is invalid"), err2)
}
