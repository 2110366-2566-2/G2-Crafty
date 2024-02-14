package uploadAPI

type UploadRequest struct {
  File []byte `json:"file"`
}
type UploadSuccessResponse struct {
  Message string `json:"message"`
  URL    string `json:"url"`
}

type UploadErrorResponse struct {
  Message string `json:"message"`
  Error   string `json:"error"`
}