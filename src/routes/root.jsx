import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";
import TopBar from "../components/TopBar";
import ScrollableComponent from "../fragments/ScrollableComponent";
import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Root() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <TopBar userAuth={isAuthenticated} />
      <ScrollableComponent>
        <div id="detail" style={{ padding: 52 }}>
          <Outlet />
        </div>
      </ScrollableComponent>
      <Footer />
    </>
  );
}
