const express = require("express");
const router = express.Router();
const { createPost, getAllPosts } = require("../controllers/postsController");

// add a post
router.post("/post", createPost);

// get posts
router.get("/all", getAllPosts);

module.exports = router;
