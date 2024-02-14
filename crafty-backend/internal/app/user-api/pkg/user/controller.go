package userAPI

import (
	"github.com/Admin-OR-1-1/2110336-SE2-Crafty/crafty-backend/internal/domain/service"
	"github.com/gofiber/fiber/v2"
)

type UserHandler struct {
	s *service.ServiceRegistry
}

type IUserHandler interface {
	GetUserInfo(*fiber.Ctx) error
	UpdateUser(*fiber.Ctx) error
	DeleteUser(*fiber.Ctx) error
}

func NewUserHandler(svc *service.ServiceRegistry) IUserHandler {
	return &UserHandler{s: svc}
}

// GetUserInfo
// @Description Get User's Info
// @Tags User
// @Security Firebase
// @Accept json
// @Produce json
// @Success 200 {array} GetUserByIDResponse
// @Failure 401 {object} authMiddleware.ErrorResponse "Invalid Token"
// @Failure 500 {string} authMiddleware.ErrorResponse message
// @Router /user [get]
func (h *UserHandler) GetUserInfo(c *fiber.Ctx) error {

	userid := c.Locals("uid").(string)

	user, err := h.s.UserService.GetUserById(userid)
	if err != nil {
		return c.Status(404).JSON(GetUserByIDResponse{Message: "Not registered"})
	}

	return c.Status(200).JSON(GetUserByIDResponse{Message: "Registered", User: user})
}

// UpdateUser
// @Description UpdateUser
// @Tags User
// @Security Firebase
// @Accept json
// @Produce json
// @Param UpdateUser body UpdateUserRequest true "UpdateUser"
// @Failure 401 {object} authMiddleware.ErrorResponse "Invalid Token"
// @Failure 403 {object} authMiddleware.ErrorResponse "No Permissions"
// @Success 201 {object} UpdateUserResponse "Update User Success"
// @Failure  500 {object} UpdateUserResponse "Update User Failed"
// @Router /user [put]
func (h *UserHandler) UpdateUser(c *fiber.Ctx) error {
	uid := c.Locals("uid").(string)
	req := new(UpdateUserRequest)
	if err := c.BodyParser(req); err != nil {
		return c.Status(400).JSON(UpdateUserResponse{Error: err.Error()})
	}

	err := h.s.UserService.UpdateUser(req.User.ToModel(uid))
	if err != nil {
		return c.Status(400).JSON(UpdateUserResponse{Error: err.Error()})
	}

	return c.Status(201).JSON(UpdateUserResponse{Message: "User updated successfully"})
}

// DeleteUser
// @Description DeleteUser
// @Tags User
// @Security Firebase
// @Accept json
// @Produce json
// @Failure 401 {object} authMiddleware.ErrorResponse "Invalid Token"
// @Failure 403 {object} authMiddleware.ErrorResponse "No Permissions"
// @Success 201 {object} UpdateUserResponse "Delete User Success"
// @Failure  500 {object} UpdateUserResponse "Delete User Failed"
// @Router /user [delete]
func (h *UserHandler) DeleteUser(c *fiber.Ctx) error {

	uid := c.Locals("uid").(string)

	err := h.s.UserService.DeleteUser(uid)
	if err != nil {
		return c.Status(400).JSON(UpdateUserResponse{Error: err.Error()})
	}

	return c.Status(200).JSON(UpdateUserResponse{Message: "User deleted successfully"})
}
