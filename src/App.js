import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Layout } from "./components/organisms/Layout";
import { Home } from "./features/Home/Home";

import { Login } from "./features/user/Login";
import { Signup } from "./features/user/Signup";
import { Posts } from "./features/post/Posts";
import { PrivateRoutes } from "./util/PrivateRoutes";
import { CreatePost } from "./features/post/CreatePost";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/posts" element={<Posts />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/new" element={<CreatePost />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
