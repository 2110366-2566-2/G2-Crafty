package infrastructure

import (
	"os"

	database "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/pkg/infrastructure/database"
	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/pkg/infrastructure/firebase"
	storage "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/pkg/infrastructure/storage"
)

type Infrastructure struct {
	Database *database.MongoInstance
	Firebase *firebase.FirebaseInstance
  Storage *storage.S3Uploader
}

func NewInfrastructure() *Infrastructure {
	database := database.NewMongoInstance(os.Getenv("MONGODB_URI"), os.Getenv("crafty-dev"))
	firebase := firebase.NewFirebaseInstance()
  storage := storage.NewS3Uploader(os.Getenv("R2_TOKEN"),os.Getenv("R2_ACCESS_KEY_ID"), os.Getenv("R2_SECRET_ACCESS_KEY"), os.Getenv("R2_REGION"), os.Getenv("R2_BUCKET"))
	return &Infrastructure{
		Database: database,
		Firebase: firebase,
    Storage: storage,
	}
}
