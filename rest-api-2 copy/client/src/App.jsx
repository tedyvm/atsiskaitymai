import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import { getToken, setToken } from "./api";

export default function App() {
  const navigate = useNavigate();
  const [token, setTokenState] = useState(getToken());

  function handleLogout() {
    setToken("");
    setTokenState("");
    navigate("/login");
  }

  return (
    <div className="p-4">
      <nav className="flex gap-4 mb-6">
        {token ? (
          <>
            <Link to="/notes">Notes</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route
          path="/"
          element={token ? <Notes /> : <Login onLogin={setTokenState} />}
        />
        <Route path="/login" element={<Login onLogin={setTokenState} />} />
        <Route
          path="/register"
          element={<Register onRegister={setTokenState} />}
        />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </div>
  );
}
