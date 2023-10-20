const express = require("express");
const router = express.Router();
const { likePost, unlikePost } = require("../controllers/likesController");

// like
router.post("/like", likePost);

// unlike
router.delete("/unlike", unlikePost);

module.exports = router;
