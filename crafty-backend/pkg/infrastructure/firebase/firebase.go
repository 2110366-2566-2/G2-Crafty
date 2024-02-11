package firebase

import (
	"context"
	b64 "encoding/base64"
	"log"
	"os"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
	"google.golang.org/api/option"
)

type FirebaseInstance struct {
	app *firebase.App
}

func NewFirebaseInstance() *FirebaseInstance {
	sdk, _ := b64.StdEncoding.DecodeString(os.Getenv("FIREBASE_SDK"))
	opt := option.WithCredentialsJSON(sdk)
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}
	return &FirebaseInstance{
		app: app,
	}
}

func (i *FirebaseInstance) GetAuth() *auth.Client {
	auth, err := i.app.Auth(context.Background())
	if err != nil {
		log.Fatalf("error getting Auth client: %v\n", err)
	}
	return auth
}
