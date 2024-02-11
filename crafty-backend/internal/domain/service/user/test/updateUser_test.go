package model_test

//---*IMPORTANT*---//
// Test getmodel.go first before testing this file //

import (
	"fmt"
	"testing"

	model "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/pkg/model"
	"github.com/go-playground/assert"
)

func ValidUpdatedmodel() (string, model.Tmodel) {
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

func InvalidUpdatedmodel() (string, model.Tmodel) {
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

func TestUpdatemodel(t *testing.T) {
	UID1, Updatedmodel1 := ValidUpdatedmodel()
	err1 := model.Updatemodel(Updatedmodel1)
	modelFetched1, _ := model.GetmodelById(UID1)
	assert.Equal(t, nil, err1)
	assert.Equal(t, Updatedmodel1, modelFetched1)

	UID2, Updatedmodel2 := InvalidUpdatedmodel()
	modelFetched2Before, _ := model.GetmodelById(UID2)
	err2 := model.Updatemodel(Updatedmodel2)
	modelFetched2After, _ := model.GetmodelById(UID2)
	assert.Equal(t, fmt.Errorf("Invalid UID"), err2)
	assert.Equal(t, modelFetched2Before, modelFetched2After)
}
