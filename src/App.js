import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { PrivateRoutes } from "./util/PrivateRoutes";

import { Header } from "./components/organisms/Header";
import { Footer } from "./components/organisms/Footer";
import { Home } from "./features/Home/Home";
import { Login } from "./features/user/Login";
import { Signup } from "./features/user/Signup";
import { Posts } from "./features/post/Posts";
import { FavoritePosts } from "./features/post/FavoritePosts";
import { CreatePost } from "./features/post/CreatePost";
import { EditPost } from "./features/post/EditPost";
import { MyPosts } from "./features/post/MyPosts";

function App() {
  // check if user authenticated
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (authUser) => {
    if (authUser) {
      setUser(authUser);
    } else {
      setUser(null);
    }
  });

  console.log(user);

  return (
    <BrowserRouter>
      <Header user={user} />
      <main>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoutes user={user} />}>
            <Route path="/posts" element={<Posts />} />
            <Route path="/new" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/favorite" element={<FavoritePosts />} />
            <Route path="/my-posts" element={<MyPosts />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
