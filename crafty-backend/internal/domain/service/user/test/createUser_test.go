package model_test

import (
	"fmt"
	"testing"

	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/domain/model"
	"github.com/go-playground/assert"
)

func ValidCreatedmodel() (string, model.Tmodel) {
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

func InvalidCraetedmodel() (string, model.Tmodel) {
	UID := "UidThatIsInvalid"
	InvalidAddress := model.TAddress{
		Address_1:   "Address_1ThatIsInvalid",
		Street:      "StreetThatIsInvalid",
		Tambon:      "TambonThatIsInvalid",
		Amphoe:      "AmphoeThatIsInvalid",
		Province:    "ProvinceThatIsInvalid",
		Postal_code: "Postal_codeThatIsInvalid",
	}
	Invalidmodel := model.Tmodel{
		UID:          UID,
		modelname:    "modelnameThatIsInvalid",
		Phone_number: "PhoneNumberThatIsInvalid",
		Address:      InvalidAddress,
		PictureUrl:   "PictureUrlThatIsInvalid",
	}
	return UID, Invalidmodel
}

func UsedNumbermodel() (string, model.Tmodel) {
	UID := "UidThatIsValid"
	ValidAddress := model.TAddress{
		Address_1:   "Address_1ThatIsValid",
		Street:      "StreetThatIsValid",
		Tambon:      "TambonThatIsValid",
		Amphoe:      "AmphoeThatIsValid",
		Province:    "ProvinceThatIsValid",
		Postal_code: "Postal_codeThatIsValid",
	}
	UsedNumbermodel := model.Tmodel{
		UID:          UID,
		modelname:    "modelnameThatIsValid",
		Phone_number: "PhoneNumberThatIsUsed",
		Address:      ValidAddress,
		PictureUrl:   "PictureUrlThatIsValid",
	}
	return UID, UsedNumbermodel
}

func TestCreatemodel(t *testing.T) {
	//case success
	ValidCreateUID, ValidCreatemodel := ValidCreatedmodel()
	err1 := model.Createmodel(ValidCreatemodel)
	modelFetched1, _ := model.GetmodelById(ValidCreateUID)
	assert.Equal(t, nil, err1)
	assert.Equal(t, ValidCreateUID, modelFetched1)

	//case phone number already use
	_, UsedNumbermodel := UsedNumbermodel()
	err2 := model.Createmodel(UsedNumbermodel)
	assert.Equal(t, fmt.Errorf("Phone Number is already used"), err2)

	//case invalid
	_, ValidCreatemodel3 := InvalidCraetedmodel()
	err3 := model.Createmodel(ValidCreatemodel3)
	//modelFetched2, _ := model.GetmodelById(ValidCreateUID2)
	assert.Equal(t, fmt.Errorf("Invalid Information"), err3)
	//assert.Equal(t, ValidCreateUID, modelFetched2)
}
