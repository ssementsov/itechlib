import Head from 'next/head';
import { useState, useCallback } from 'react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme';
import { SnackbarProvider } from 'notistack';
import { Slide } from '@mui/material';
import { Provider } from 'react-redux';
import { setupStore } from './../store/store';

const store = setupStore();

const App = (props) => {
    const { Component, pageProps } = props;
    const getLayout = Component.getLayout ?? ((page) => page);
    const [isAssigned, setIsAssigned] = useState(false);
    const assignHandler = useCallback((assigned) => {
        setIsAssigned(assigned);
    }, []);

    return (
        <Provider store={store}>
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
                            vertical: 'top',
                            horizontal: 'center',
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
        </Provider>
    );
};

export default App;
