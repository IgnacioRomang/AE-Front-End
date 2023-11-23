import './App.css';
import React, { Profiler, useState } from "react";
import { createRoot } from "react-dom/client";

import Footer from "./components/Footer.jsx";
import LoginCard from "./components/LoginCard.jsx";
import TopBar from "./components/TopBar.jsx";
import RegisterCard from "./components/RegisterCard.jsx";
import ScrollableComponent from "./fragments/ScrollableComponent.jsx";
import InfoCard from "./components/InfoCard.jsx";
import { Stack } from "@mui/system";
import RenewalCard from "./components/RenewalCard.jsx";
import UserBadge from "./fragments/UserBadge.jsx";

function App() {
  const [userAuth, setUserAuth] = useState(true);
  return (
    <div className="App">
                  <TopBar userAuth={userAuth} />
            <ScrollableComponent
                styles={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flexGrow: 1,
                }}
            >
                <Stack spacing={2}>
                    <UserBadge username="Ignacio Romang" isActive={false} />
                    <RenewalCard />
                    <RegisterCard />
                    <LoginCard />
                    <InfoCard />
                </Stack>
                <Footer></Footer>
            </ScrollableComponent>
    </div>
  );
}

export default App;
