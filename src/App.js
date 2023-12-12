import React, { useState } from "react";
import "./App.css";

import { Stack } from "@mui/system";
import Footer from "./components/Footer.jsx";
import InfoCard from "./components/InfoCard.jsx";
import LoginCard from "./components/LoginCard.jsx";
import Profile from "./components/Profile";
import RegisterCard from "./components/RegisterCard.jsx";
import RenewalCard from "./components/RenewalCard.jsx";
import TopBar from "./components/TopBar.jsx";
import ScrollableComponent from "./fragments/ScrollableComponent.jsx";
import ProfileData from "./fragments/ProfileData";
import UnRegisterCard from "./components/UnRegisterCard";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import Login from "./components/LoginCard.jsx";
import News from "./routes/news";
import ResetPassword from "./components/ResetPassword.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "news",
        element: <News />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <RegisterCard />,
      },
      {
        path: "renewal",
        element: <RenewalCard />,
      },
      {
        path: "profile/:id",
        element: <Profile />,
      },
      {
        path: "end",
        element: <UnRegisterCard />,
      },
      {
        path: "reset-ps",
        element: <ResetPassword />,
      },
    ],
  },
]);

function App() {
  const [userAuth, setUserAuth] = useState(true);
  return (
    <div className="App app-container">
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
