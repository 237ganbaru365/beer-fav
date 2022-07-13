import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout } from "./components/Layout/Layout";
import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth isLogin={true} />} />
          <Route path="/signup" element={<Auth isLogin={false} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
