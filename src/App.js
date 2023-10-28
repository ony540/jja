import React, { Suspense } from 'react';
import { appRouter } from './pages/Router';
import { RouterProvider } from 'react-router-dom';
import { Global, ThemeProvider } from '@emotion/react';
import GlobalStyle from './style/globalStyle';
import theme from './style/theme';

export default function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Global styles={GlobalStyle} />
                <Suspense fallback={null}>
                    <RouterProvider router={appRouter} fallbackElement={null} />
                </Suspense>
            </ThemeProvider>
        </>
    );
}
