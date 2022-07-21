import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Layout } from "./components/organisms/Layout";
import { Home } from "./features/Home/Home";

import { PrivateRoutes } from "./util/PrivateRoutes";
import { Login } from "./features/user/Login";
import { Signup } from "./features/user/Signup";
import { Posts } from "./features/post/Posts";
import { FavoritePosts } from "./features/post/FavoritePosts";
import { CreatePost } from "./features/post/CreatePost";
import { EditPost } from "./features/post/EditPost";
import { MyPosts } from "./features/post/MyPosts";

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
          <Route element={<PrivateRoutes />}>
            <Route path="/edit" element={<EditPost />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/favorite" element={<FavoritePosts />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/my-posts" element={<MyPosts />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
