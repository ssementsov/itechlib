import { useState, useEffect } from "react";
import Router from "next/router";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";
import {
  MAIN_CATALOGUE_PATH,
  LOGIN_PATH,
} from "../common/constants/route-constants";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const { pathname } = Router;
    if (pathname === MAIN_CATALOGUE_PATH && !token) {
      Router.replace(LOGIN_PATH);
    } else {
      setLoaded(true);
    }
  }, []);

  if (!loaded) {
    return <div></div>;
  }

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
};
