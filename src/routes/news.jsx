import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";
import TopBar from "../components/TopBar";
import ScrollableComponent from "../fragments/ScrollableComponent";
import { Grid } from "@mui/material";

export default function News() {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={4}>
          <InfoCard />
        </Grid>
        <Grid item xs={4}>
          <InfoCard />
        </Grid>
        <Grid item xs={4}>
          <InfoCard />
        </Grid>
      </Grid>
    </>
  );
}
