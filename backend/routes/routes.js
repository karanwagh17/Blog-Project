const express = require("express");
const { postBlog,getBlogs ,deleteBlog,updateBlogs,getSingleBlogs} = require("../controllers/blogController");

const blogRouter = express.Router();

blogRouter.post("/blogPost", postBlog);
blogRouter.get("/getBlogs", getBlogs);

blogRouter.get("/getSingleBlogs/:blogId", getSingleBlogs);
blogRouter.delete("/deleteBlog/:blogId", deleteBlog);
blogRouter.put("/updateBlogs/:blogId", updateBlogs);




module.exports = blogRouter;
