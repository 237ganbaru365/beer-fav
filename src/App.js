import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { PrivateRoutes } from "./util/PrivateRoutes";
import { PublicRoutes } from "./util/PublicRoute";

import { Header } from "./components/organisms/Header";
import { Footer } from "./components/organisms/Footer";
import { Home } from "./features/Home/Home";
import { Auth } from "./features/user/Auth";

import { Posts } from "./features/post/Posts";
import { FavoritePosts } from "./features/post/FavoritePosts";
import { CreatePost } from "./features/post/CreatePost";
import { EditPost } from "./features/post/EditPost";
import { MyPosts } from "./features/post/MyPosts";

function App() {
  // check if user authenticated
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
      // cleanup function
      return () => unSubscribe();
    });
  }, []);

  return (
    <BrowserRouter>
      <Header user={user} />
      <main>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" element={<Home />} />
          <Route element={<PublicRoutes user={user} />}>
            <Route path="/login" element={<Auth isLoginMode={true} />} />
            <Route path="/signup" element={<Auth isLoginMode={false} />} />
          </Route>
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
