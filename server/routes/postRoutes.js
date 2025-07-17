const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const postController = require("../controllers/postController");

router
  .route("/")
  .post(protect, postController.createPost)
  .get(postController.getPosts);

router
  .route("/:id")
  .get(postController.getPostById)
  .put(protect, postController.updatePost)
  .delete(protect, postController.deletePost);

module.exports = router;
