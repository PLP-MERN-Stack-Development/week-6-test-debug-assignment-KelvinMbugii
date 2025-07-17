const Post = require("../models/Post");

exports.createPost = async (req, res, next) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content || !category)
      return res.status(400).json({ error: "Missing fields" });
    const post = await Post.create({
      ...req.body,
      author: req.user.id,
      slug: title.toLowerCase().replace(/\s+/g, "-"),
    });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const query = category ? { category } : {};
    const posts = await Post.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ error: "Not authorized" });

    Object.assign(post, req.body);
    await post.save();
    res.json(post);
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ error: "Not authorized" });

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (err) {
    next(err);
  }
};
