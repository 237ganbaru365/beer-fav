import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { getUserByUserId } from "./app/servises/user.services";
import { PrivateRoutes } from "./util/PrivateRoutes";
import { PublicRoutes } from "./util/PublicRoute";
import { login } from "./features/user/userSlice";

import { Header } from "./components/organisms/Header";
import { Footer } from "./components/organisms/Footer";
import { Home } from "./features/Home/Home";
import { Auth } from "./features/user/Auth";
import { AllPosts } from "./features/post/AllPosts";
import { FavoritePosts } from "./features/post/FavoritePosts";
import { CreatePost } from "./features/post/CreatePost";
import { EditPost } from "./features/post/EditPost";
import { MyPosts } from "./features/post/MyPosts";

function App() {
  const dispatch = useDispatch();

  //FIXME: これ、Authでもしないと、ログインもしくはサインアップした時にreduxにdispatchされへんからページ遷移しない
  const initUser = async (authUid) => {
    try {
      const userFetchResult = await getUserByUserId(authUid);

      const userData = userFetchResult.data();

      dispatch(
        login({
          user: {
            ...userData,
            myPostIdList: userData.myPostIdList ? userData.myPostIdList : [],
            favPostIdList: userData.favPostIdList ? userData.favPostIdList : [],
          },
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  // fetch user data and store to redux state while user login
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        initUser(authUser.uid);
      } else {
        console.log("user log out!");
      }
      // cleanup function
      return () => unSubscribe();
    });
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" element={<Home />} />
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<Auth isLoginMode={true} />} />
            <Route path="/signup" element={<Auth isLoginMode={false} />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/posts" element={<AllPosts />} />
            <Route path="/my-posts" element={<MyPosts />} />
            <Route path="/favorite" element={<FavoritePosts />} />
            <Route path="/new" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
