import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import TopBar from "../components/TopBar";
import { useAuth } from "../contexts/AuthContext";
import ScrollableComponent from "../fragments/ScrollableComponent";

export default function Root() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <TopBar userAuth={isAuthenticated} />
      <ScrollableComponent>
        <div id="detail" style={{ padding: 50 }}>
          <Outlet />
        </div>
      </ScrollableComponent>
      <Footer />
    </>
  );
}
