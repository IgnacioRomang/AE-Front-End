import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";
import TopBar from "../components/TopBar";
import ScrollableComponent from "../fragments/ScrollableComponent";

export default function Root() {
  return (
    <>
      <TopBar userAuth={false} />
      <ScrollableComponent>
        <div id="detail" style={{ padding: 52 }}>
          <Outlet />
        </div>
      </ScrollableComponent>
      <Footer />
    </>
  );
}
