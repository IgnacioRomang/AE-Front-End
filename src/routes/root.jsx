import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";
import TopBar from "../components/TopBar";
import ScrollableComponent from "../fragments/ScrollableComponent";
import React from "react";

export default function Root() {
  const [userAuth, setUserAuth] = React.useState(
    sessionStorage.getItem("user") !== null
  );
  React.useEffect(() => {
    setUserAuth(sessionStorage.getItem("user") !== null);
  }, [userAuth, setUserAuth]);
  return (
    <>
      <TopBar userAuth={userAuth} />
      <ScrollableComponent>
        <div id="detail" style={{ padding: 52 }}>
          <Outlet />
        </div>
      </ScrollableComponent>
      <Footer />
    </>
  );
}
