import Head from "next/head";
import { useState, useCallback } from "react";
import { CacheProvider } from "@emotion/react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { theme } from "../theme";
import { SnackbarProvider } from "notistack";
import { Slide } from "@mui/material";

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);
  const [isAssigned, setIsAssigned] = useState(false);
  const assignHandler = useCallback((assigned) => {
    setIsAssigned(assigned);
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>ITechLib</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            maxSnack={3}
            hideIconVariant
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            TransitionComponent={Slide}
          >
            <CssBaseline />
            {getLayout(
              <Component
                isAssigned={isAssigned}
                assignHandler={assignHandler}
                {...pageProps}
              />
            )}
          </SnackbarProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
