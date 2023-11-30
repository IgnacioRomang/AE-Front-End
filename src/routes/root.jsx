import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";
import TopBar from "../components/TopBar";
import ScrollableComponent from "../fragments/ScrollableComponent";
import { Grid } from "@mui/material";

export default function Root() {
  return (
    <>
      <TopBar userAuth={true} />
      <ScrollableComponent>
        <div id="detail">
          <Outlet />
        </div>
      </ScrollableComponent>
      <Footer />
    </>
  );
}
