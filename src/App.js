import React from "react";
import "./App.css";

import Profile from "./components/Profile";
import RegisterCard from "./components/RegisterCard.jsx";
import RenewalCard from "./components/RenewalCard.jsx";
import UnRegisterCard from "./components/UnRegisterCard";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/LoginCard.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import { AuthProvider } from "./contexts/AuthContext.js";
import ErrorPage from "./routes/error-page";
import News from "./routes/news";
import Root from "./routes/root";
import axios from "axios";

function App() {
  return (
    <div className="App app-container">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
              <Route path="news" element={<News />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<RegisterCard />} />
              <Route path="baja" element={<UnRegisterCard />} />
              <Route path="renewal" element={<RenewalCard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="resetpassword" element={<ResetPassword />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}
export default App;
