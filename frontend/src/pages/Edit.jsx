import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditBlog = () => {
  const { blogId } = useParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASEURL}/api/blogs/getSingleBlogs/${blogId}`,
        
        );

        const blog = res.data.blogData;
        if (blog) {
          setTitle(blog.title);
          setAuthor(blog.author);
          setContent(blog.content);
          setPublishedDate(blog.publishedDate.split("T")[0]);
          setTags(blog.tags); // join array to string
        } else {
          toast.error("Blog not found");
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
        toast.error("Failed to fetch blog");
      }
    };

    fetchBlog();
  }, [blogId]);

  const updateBlog = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASEURL}/api/blogs/updateBlogs/${blogId}`,
        {
          title,
          author,
          content,
          publishedDate,
          tags: tags 
        },
        );

      toast.success(res.data.message);
      navigate("/BlogList");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog");
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Edit Blog</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />

      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={5}
        required
        style={{ width: "100%", marginTop: "10px" }}
      />
      <br />

      <input
        type="date"
        value={publishedDate}
        onChange={(e) => setPublishedDate(e.target.value)}
        required
      />
      <br />

      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <br />

      <button onClick={updateBlog}>Update Blog</button>
    </div>
  );
};

export default EditBlog;
