package storageRepo



type IStorageRepo interface {
  UploadFile(file []byte, filename string) ( error)
  DeleteFile(filename string) error
}

