package authRepo

import (
	"context"
	"log"

	"firebase.google.com/go/auth"
	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/pkg/infrastructure"
)

type FirebaseAuthRepo struct {
auth *auth.Client
}

func CreateFirebaseAuthRepo(i *infrastructure.Infrastructure) AuthRepo {
  // app := i.Firebase.GetAuth()
  return &FirebaseAuthRepo{
    auth: i.Firebase.GetAuth(),
  }
}

func (r *FirebaseAuthRepo) VerifyToken(token string) (bool, *auth.Token, error) {
  
 verifiedToken, err := r.auth.VerifyIDToken(context.Background(), token)
  if err != nil {
          log.Fatalf("error verifying ID token: %v\n", err)
          return false, nil, err
  }

log.Printf("Verified ID token: %v\n", verifiedToken)
  return true, verifiedToken, nil
}