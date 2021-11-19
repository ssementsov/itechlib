import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import { HomePageIcon } from "../icons/home-page-icon";
import { TakenBooksIcon } from "../icons/taken-books-icon";
import { SuggestionIcon } from "../icons/suggestion-icon";
import { GivenBooksIcon } from "../icons/given-books-icon";
import { MainCatalogueIcon } from "../icons/main-catalogue-icon";
import { MyBooksIcon } from "../icons/my-books-icon";
import { SettingsIcon } from "../icons/settings-icon";
import { HelpIcon } from "../icons/help-icon";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";
import { theme } from "../theme/index";

const items = [
  {
    href: "/home",
    icon: <HomePageIcon fontSize="small" />,
    title: "Home page",
  },
  {
    href: "/my-books",
    icon: <MyBooksIcon fontSize="small" />,
    title: "My books",
  },
  {
    href: "/main-catalogue",
    icon: <MainCatalogueIcon fontSize="small" />,
    title: "Main Catalogue",
  },
  {
    href: "/given-books",
    icon: <GivenBooksIcon fontSize="small" />,
    title: "The books I gave",
  },
  {
    href: "/taken-books",
    icon: <TakenBooksIcon fontSize="small" />,
    title: "The books I took",
  },
  {
    href: "/suggestion",
    icon: <SuggestionIcon fontSize="small" />,
    title: "View suggestion list",
  },
  {
    href: "/register",
    icon: <SettingsIcon fontSize="small" />,
    title: "Settings",
  },
  {
    href: "/404",
    icon: <HelpIcon fontSize="small" />,
    title: "Help",
  },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(() => {
    if (router.isReady && open) {
      onClose?.();
    }
  }, [router.asPath]);

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href="/home" passHref>
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                />
              </a>
            </NextLink>
          </Box>
        </div>
        <Divider
          theme={theme}
          sx={{
            borderColor: "background.divider",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: "background.divider" }} />
        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        >
          <Typography color="neutral.500" variant="body2">
            Terms and conditions
          </Typography>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
