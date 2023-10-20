const Post = require("../models/Posts");

exports.createPost = async (req, res) => {
  try {
    const { title, user, body } = req.body;
    if (!title || !user || !body) {
      return res.status(400).json({
        success: false,
        message: "Post Details Missing",
      });
    }

    await Post.create({ title, user, body });
    res.status(201).json({
      success: true,
      message: "Post created",
    });
  } catch (err) {
    console.log("Erorr while creating post");
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find();
    if (!allPosts) {
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });
    }
    res.status(200).json({
      success: true,
      data: allPosts,
    });
  } catch (err) {
    console.log("Erorr while fetching posts");
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
