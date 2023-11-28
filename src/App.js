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

function App() {
  const [userAuth, setUserAuth] = useState(false);
  return (
    <div className="App app-container">
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
          <UnRegisterCard />
          <Profile />
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
