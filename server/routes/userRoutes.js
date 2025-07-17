const express = require("express");
const router = express.Router();
const { getProfile, updateProfile, getUsers, getUser, deleteUser, } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Route: GET /api/users (all users)
router.get("/", protect, getUsers);

// Route: GET /api/users/profile (logged-in user profile)
router.get("/profile", protect, getProfile);

// Route: PUT /api/users/profile (update profile)
router.put("/profile", protect, updateProfile);

// Route: GET /api/users/:id (single user by ID)
router.get("/:id", protect, getUser);

// Route: DELETE /api/users/:id (delete user by ID)
router.delete("/:id", protect, deleteUser);

module.exports = router;
