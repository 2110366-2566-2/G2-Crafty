package model_test

import (
	"fmt"
	"strings"
	"testing"

	model "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/pkg/model"
	"github.com/go-playground/assert"
)

func ValidUID() (string, model.Tmodel) {
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

// Example function from Kongphob not used in this test
func InvalidField(fieldNames []string) error {
	return fmt.Errorf("Invalid field: %s", strings.Join(fieldNames, ", "))
}

func InvalidUID() string {
	return "UidThatIsInvalid"
}

func TestGetmodel(t *testing.T) {
	ValidUID, Validmodel := ValidUID()
	model1, Err1 := model.GetmodelById(ValidUID)
	assert.Equal(t, Validmodel, model1)
	assert.Equal(t, nil, Err1)

	InvalidUID := InvalidUID()
	model2, Err2 := model.GetmodelById(InvalidUID)
	assert.Equal(t, nil, model2)
	assert.Equal(t, fmt.Errorf("Invalid UID"), Err2)
}
