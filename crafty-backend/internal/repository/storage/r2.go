package storageRepo

import (
	"bytes"
	"context"
	"fmt"

	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/pkg/infrastructure"
	storage "github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/pkg/infrastructure/storage"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type R2StorageRepo struct {
  r2 *storage.S3Uploader
}

func NewR2StorageRepo(i *infrastructure.Infrastructure) IStorageRepo {
  return &R2StorageRepo{
    r2: i.Storage,
  }
}

func (r *R2StorageRepo) UploadFile(file []byte, filename string) (error) {
  fileReader := bytes.NewReader(file)
  _, err := r.r2.SVC.PutObject(context.TODO(), &s3.PutObjectInput{
    Bucket: aws.String(r.r2.BucketName),
    Key:    aws.String(filename),
    Body:   fileReader,
})
if err != nil {
  fmt.Println(err)
    return err

}
// presignClient := s3.NewPresignClient(r.r2.SVC)

	// presignResult, err := presignClient.PresignPutObject(context.TODO(), &s3.PutObjectInput{
	// 	Bucket: aws.String(r.r2.BucketName),
	// 	Key:    aws.String(filename),
	// })

	// if err != nil {
	// 	panic("Couldn't get presigned URL for PutObject")
	// }


  return  nil
}

func (r *R2StorageRepo) DeleteFile(fileName string) error {
  // return r.r2.SVC.Delete(r.r2.BucketName, fileName)
  return nil
}