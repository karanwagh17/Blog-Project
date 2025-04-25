const blogModel = require("../models/blog");

const postBlog = async (req, res) => {
  const { title, author, content, publishedDate, tags } = req.body;

  if (!title || !author || !content || !publishedDate || !tags) {
    return res.status(400).json({ message: "fill all the blanks" });
  }
  try {
    const blogs = await blogModel.create({
      ...req.body,
    });
    return res
      .status(201)
      .json({ message: " blog added successfully!", blogs });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogData = await blogModel.find();

    return res
      .status(201)
      .json({ message: " blog added successfully!", blogData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deleteBlog = async (req, res) => {
  const { blogId } = req.params;

  if (!blogId) {
    return res.status(500).json({ message: "you can't delete this blog" });
  }
  try {
    await blogModel.findByIdAndDelete(blogId);
    return res.status(201).json({ message: " blog delete successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const updateBlogs = async (req, res) => {
  const { blogId } = req.params;
  if (!blogId) {
    return res.status(500).json({ message: "you can't update this blog" });
  }

  try {
    const upadateData = await blogModel.findByIdAndUpdate(blogId, {
      $set: { ...req.body },
    });
    if (!upadateData) {
      return res.status(500).json({ message: "blogs not found" });
    }
    return res.status(200).json({ message: "movie updated", upadateData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getSingleBlogs = async (req, res) => {
  try {
    const blogData = await blogModel.findOne({_id: req.params.blogId});

    return res
      .status(201)
      .json({ message: " blog added successfully!", blogData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { postBlog, getSingleBlogs,getBlogs, deleteBlog, updateBlogs };
