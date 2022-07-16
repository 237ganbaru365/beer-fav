import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Layout } from "./components/Layout/Layout";
import { Home } from "./pages/Home";

import { Login } from "./features/user/Login";
import { Signup } from "./features/user/Signup";
import { Posts } from "./features/post/Posts";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
