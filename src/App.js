import React from "react";
import "./App.css";

import Profile from "./components/Profile";
import RegisterCard from "./components/RegisterCard.jsx";
import RenewalCard from "./components/RenewalCard.jsx";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EmailChange from "./components/EmailChange.jsx";
import FAQcard from "./components/FAQ.jsx";
import FinalizeCard from "./components/FinalizeCard.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import Login from "./components/LoginCard.jsx";
import PDFViewer from "./components/PDFViewer.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import VerificationCard from "./components/VerifyEmail.jsx";
import { ServiceProvider } from "./contexts/ServiceContext.js";
import ErrorPage from "./routes/error-page";
import News from "./routes/news";
import Root from "./routes/root";

function App() {
  return (
    <div className="App app-container">
      <ServiceProvider>
        <Router>
          <Routes>
            <Route path="/" element={<News />} errorElement={<ErrorPage />} />

            <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
              <Route path="faq" element={<FAQcard />} />
              <Route path="document/:id" element={<PDFViewer />} />
            </Route>

            <Route path="/auth" element={<Root />} errorElement={<ErrorPage />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<RegisterCard />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
            </Route>

            <Route path="/user" element={<Root />} errorElement={<ErrorPage />}>
              <Route path="ae-finalize" element={<FinalizeCard />} />
              <Route path="ae-renewal" element={<RenewalCard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route path="email-change" element={<EmailChange />} />
              <Route
                path="verify-email/:id/:hash"
                element={<VerificationCard />}
              />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </ServiceProvider>
    </div>
  );
}
export default App;
