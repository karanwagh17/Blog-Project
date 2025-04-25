import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const BlogList = () => {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userId = userData?._id;
  const [blogs, setBlogs] = useState([]);

  const BASE_URL = import.meta.env.VITE_BASEURL;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/blogs/getBlogs`);
        setBlogs(response.data.blogData || []);
        toast.success(response.data.message || "Blogs fetched successfully");
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to fetch blogs");
      }
    };

    fetchBlogs();
  }, [userId]);

  const handleDelete = async (blogId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/blogs/deleteBlog/${blogId}`);
      toast.success(response.data.message || "Blog deleted successfully");
      setBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
    } catch (error) {
      console.error(error.message);
      toast.error(error.response?.data?.message || "Failed to delete blog");
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center", margin: "2rem 0" }}>
        <h2>Blog List</h2>
        <Link to="/BlogForm">
          <Button variant="success">Add Blog</Button>
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Card key={blog._id} style={{ width: "100%", minHeight: "400px" }}>
              {blog.image && (
                <Card.Img
                  variant="top"
                  src={blog.image}
                  alt={blog.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text>Author: {blog.author}</Card.Text>
                <Card.Text>
                  Tags: {Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags}
                </Card.Text>
                <Card.Text>
                  {blog.content?.substring(0, 100)}...{" "}
                  <Link to={`/view/${blog._id}`}>Read more</Link>
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Link to={`/edit/${blog._id}`}>
                    <Button variant="primary">Edit</Button>
                  </Link>
                  <Button variant="danger" onClick={() => handleDelete(blog._id)}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default BlogList;
