package postAPI

import (
	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/domain/model"
	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/domain/service"
	"github.com/gofiber/fiber/v2"
)

type PostHandler struct {
	s *service.ServiceRegistry
}

type IPostHandler interface {
	ListPost(*fiber.Ctx) error
	GetPostInfo(*fiber.Ctx) error
	UpdatePost(*fiber.Ctx) error
	DeletePost(*fiber.Ctx) error
}

func NewPostHandler(svc *service.ServiceRegistry) IPostHandler {
	return &PostHandler{s: svc}
}

// ListPost
// @Description ListPost
// @Tags Post
// @Security Firebase
// @Accept json
// @Produce json
// @Success 200 {array} GetPostByIDResponse
// @Failure 401 {object} authMiddleware.ErrorResponse "Invalid Token"
// @Failure 403 {object} authMiddleware.ErrorResponse "No Permissions"
// @Failure 500 {string} authMiddleware.ErrorResponse message
// @Router /post/list [get]
func (h *PostHandler) ListPost(c *fiber.Ctx) error {
	posts, err := h.s.PostService.GetPost(model.TPost{}, -1, -1, 100)
	if err != nil {
		return c.Status(404).JSON(GetPostByIDResponse{Error: err})
	}
	return c.Status(200).JSON(ListPostResponse{Post: posts, Error: err})
}

// GetUserInfo
// @Description Get User's Info
// @Tags Post
// @Security Firebase
// @Accept json
// @Produce json
// @Param PostID path string true "PostID"
// @Success 200 {array} GetPostByIDResponse
// @Failure 401 {object} authMiddleware.ErrorResponse "Invalid Token"
// @Failure 403 {object} authMiddleware.ErrorResponse "No Permissions"
// @Failure 500 {string} authMiddleware.ErrorResponse message
// @Router /post/{PostID} [get]
func (h *PostHandler) GetPostInfo(c *fiber.Ctx) error {

	postid := c.Params("postId")
	post, err := h.s.PostService.GetPostById(postid)
	if err != nil {
		return c.Status(404).JSON(GetPostByIDResponse{Error: err})
	}

	return c.Status(200).JSON(GetPostByIDResponse{Post: post})
}

// UpdateUser
// @Description UpdateUser
// @Tags Post
// @Security Firebase
// @Accept json
// @Produce json
// @Param UpdateUser body UpdatePostRequest true "UpdateUser"
// @Failure 401 {object} authMiddleware.ErrorResponse "Invalid Token"
// @Failure 403 {object} authMiddleware.ErrorResponse "No Permissions"
// @Success 201 {object} UpdatePostResponse "Update User Success"
// @Failure  500 {object} UpdatePostResponse "Update User Failed"
// @Router /post [put]
func (h *PostHandler) UpdatePost(c *fiber.Ctx) error {
	uid := c.Locals("post").(string)
	req := new(UpdatePostRequest)
	if err := c.BodyParser(req); err != nil {
		return c.Status(400).JSON(UpdatePostResponse{Error: err.Error()})
	}

	err := h.s.PostService.CreatePost(req.Post.ToModel(uid))
	if err != nil {
		return c.Status(400).JSON(UpdatePostResponse{Error: err.Error()})
	}

	return c.Status(201).JSON(UpdatePostResponse{Message: "Post updated successfully"})
}

// DeleteUser
// @Description DeleteUser
// @Tags Post
// @Security Firebase
// @Accept json
// @Produce json
// @Failure 401 {object} authMiddleware.ErrorResponse "Invalid Token"
// @Failure 403 {object} authMiddleware.ErrorResponse "No Permissions"
// @Success 201 {object} UpdatePostResponse "Delete User Success"
// @Failure  500 {object} UpdatePostResponse "Delete User Failed"
// @Router /post [delete]
func (h *PostHandler) DeletePost(c *fiber.Ctx) error {

	uid := c.Locals("post").(string)

	err := h.s.PostService.DeletePost(uid)
	if err != nil {
		return c.Status(400).JSON(UpdatePostResponse{Error: err.Error()})
	}

	return c.Status(200).JSON(UpdatePostResponse{Message: "Post deleted successfully"})
}
