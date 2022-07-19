import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Layout } from "./components/Layout/Layout";
import { Home } from "./features/home/Home";

import { Login } from "./features/user/Login";
import { Signup } from "./features/user/Signup";
import { Posts } from "./features/post/Posts";
import { PrivateRoutes } from "./util/PrivateRoutes";

// REVIEW
// global error modal
// redux
// ref:
// https://github.com/sounit-organization/job_search_app_front/blob/main/src/App.tsx
const error = true;

function App() {
  return (
    <BrowserRouter>
      <Layout>
        {/* REVIEW */}
        <p>{error && "Error"}</p>
        <Routes>
          {/* FIXME: ここにないパラメふられたらhomeに全部とばす */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/posts" element={<Posts />} />
          </Route>
          {/* star root / default root */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
