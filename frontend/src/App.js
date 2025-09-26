import React from "react";
import { Routes, Route } from "react-router-dom";
import { GlobalStyles } from "@mui/material";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import VideoPage from "./pages/VideoPage";

function App() {
  return (
    <>
    <GlobalStyles
        styles={{
          body: {
            margin: 0,
            padding: 0,
            overflowX: "hidden",
          },
        }}
      />


    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/video/:id" element={<VideoPage />} />
    </Routes>
    </>
  );
}

export default App;
