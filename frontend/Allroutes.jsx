import React from "react";

import { Route, Routes } from "react-router-dom";
import BlogList from "./src/pages/BlogList";
import BlogForm from "./src/pages/BlogForm";

import EditBlog from "./src/pages/Edit";
import Home from "./src/pages/home";

const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>

      <Route path="/BlogList" element={<BlogList />}></Route>
      <Route path="/BlogForm" element={<BlogForm />}></Route>
      <Route path="/edit/:blogId" element={<EditBlog />}></Route>
    </Routes>
  );
};

export default Allroutes;
