const Post = require("../models/Posts");
const Like = require("../models/Likes");

exports.likePost = async (req, res) => {
  try {
    const { user, post } = req.body;
    if (!user || !post) {
      return res.status(400).json({
        success: false,
        message: "Like Parameters missing",
      });
    }

    const foundPost = await Post.findById(post);
    if (!foundPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const like = await Like.create({ user, post });
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: like._id } },
      { new: true }
    )
      .populate("likes")
      .populate("comments");

    res.status(201).json({
      success: true,
      message: "Like Added",
      data: updatedPost,
    });
  } catch (err) {
    console.log("Error in Adding Like");
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const { post, like } = req.body;
    if (!post || !like) {
      return res.status(400).json({
        success: false,
        message: "unlike Parameters missing",
      });
    }

    const foundPost = await Post.findById(post);
    const foundLike = await Like.findById(like);
    if (!foundPost || !foundLike) {
      return res.status(400).json({
        success: false,
        message: "Post or Like Not found",
      });
    }

    await Like.findByIdAndDelete({ _id: like });
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      {
        $pull: { likes: like },
      },
      { new: true }
    )
      .populate("likes")
      .populate("comments");

    res.status(200).json({
      success: true,
      message: "Like Removed",
      data: updatedPost,
    });
  } catch (err) {
    console.log("Error While unliking post");
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
