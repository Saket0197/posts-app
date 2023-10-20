const Post = require("../models/Posts");
const Comment = require("../models/Comments");

exports.createComment = async (req, res) => {
  try {
    const { user, body, post } = req.body;

    if (!user || !body || !post) {
      return res.status(400).json({
        success: false,
        message: "Comment Details Missing",
      });
    }

    const foundPost = await Post.findById(post);
    if (!foundPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const createdComment = await Comment.create({ user, body, post });
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: createdComment._id } },
      { new: true }
    )
      .populate("comments")
      .populate("likes");

    res.status(201).json({
      success: true,
      message: "Comment Added",
      data: updatedPost,
    });
  } catch (err) {
    console.log("Error in Creating Comment");
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
