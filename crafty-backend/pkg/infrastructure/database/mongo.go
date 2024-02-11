package infrastructure_database

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoInstance struct {
	client   *mongo.Client
	database *mongo.Database
}

type MongodbRepository struct {
	collection *mongo.Collection
}

var MI *MongoInstance

func NewMongoInstance(uri string, dbname string) *MongoInstance {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Connected to MongoDB!")
	db := client.Database(dbname)

	return &MongoInstance{
		client:   client,
		database: db,
	}
}

func (i *MongoInstance) NewMongodbCollection(collectionName string) *mongo.Collection {
	return i.database.Collection(collectionName)
}

func (m *MongoInstance) NewMongodbRepository(collectionName string) (*MongodbRepository, error) {
	return &MongodbRepository{collection: m.database.Collection(collectionName)}, nil
}
