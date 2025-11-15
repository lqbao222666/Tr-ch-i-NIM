import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GamePage from "./GamePage.jsx";
import SavedGamesPage from "./components/SavedGamesPage.jsx";

import "./output.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GamePage />} />
        <Route path="/:id" element={<GamePage />} />
        <Route path="/saved-games" element={<SavedGamesPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
