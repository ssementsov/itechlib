import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";
import {
  MAIN_CATALOGUE_PATH,
  LOGIN_PATH,
  ROOT_PATH,
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
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    let corpEmail = localStorage.getItem("corpEmail");
    const { pathname } = router;
    if (pathname === MAIN_CATALOGUE_PATH && !token && !corpEmail) {
      router.replace(ROOT_PATH);
    } else if (pathname === MAIN_CATALOGUE_PATH && !token) {
      router.replace(LOGIN_PATH);
    } else {
      setLoaded(true);
    }
  }, [router]);

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
