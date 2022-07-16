import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Layout } from "./components/Layout/Layout";
import { Home } from "./pages/Home";

import { Login } from "./features/user/Login";
import { Signup } from "./features/user/Signup";
import { Posts } from "./features/post/Posts";
import { PrivateRoutes } from "./util/PrivateRoutes";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* FIXME: ここにないパラメふられたらhomeに全部とばす */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/posts" element={<Posts />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
