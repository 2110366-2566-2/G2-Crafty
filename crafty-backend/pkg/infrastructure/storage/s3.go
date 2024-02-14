package infrastructure

import (
	"context"
	"log"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type S3Uploader struct {
    SVC *s3.Client
    BucketName string
}

func NewS3Uploader(token string, keyid string, accesskey string ,region string, bucket string) (*S3Uploader) {
    // sess, err := session.NewSession(&aws.Config{
    //     Region: aws.String(region),
    //     Credentials: credentials.NewStaticCredentials(keyid, accesskey, token),
    //     Endpoint: aws.String("https://14a72408b58c4d98260866e378505d77.r2.cloudflarestorage.com/kuranasaki-01"),
    // })
    r2Resolver := aws.EndpointResolverWithOptionsFunc(func(service, region string, options ...interface{}) (aws.Endpoint, error) {
      return aws.Endpoint{
        URL: "https://14a72408b58c4d98260866e378505d77.r2.cloudflarestorage.com",
      }, nil
    })
  
    cfg, err := config.LoadDefaultConfig(context.TODO(),
      config.WithEndpointResolverWithOptions(r2Resolver),
      config.WithCredentialsProvider(credentials.NewStaticCredentialsProvider(keyid, accesskey, "")),
      config.WithRegion("auto"),
    )
    if err != nil {
      log.Fatal(err)
    }
  
    client := s3.NewFromConfig(cfg)
    return &S3Uploader{SVC: client, BucketName: bucket}


}
