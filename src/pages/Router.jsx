import React, { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
const MainPage = lazy(() => import('./MainPage/MainPage'));
const InformationPage = lazy(() => import('./InformationPage/InformationPage'));
const IndexPage = lazy(() => import('./BookcontentsPage/IndexPage/IndexPage'));
const ChapterPage = lazy(() =>
    import('./BookcontentsPage/ChapterPage/ChapterPage'),
);
const RootLayout = lazy(() => import('./RootLayout'));
const ErrorPage = lazy(() => import('./ErrorPage/ErrorPage'));

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <MainPage />,
            },
            {
                path: 'info',
                element: <InformationPage />,
            },
            {
                path: ':bookname',
                children: [
                    {
                        path: 'index',
                        element: <IndexPage />,
                    },
                    {
                        path: ':chapter',
                        element: <ChapterPage />,
                    },
                    {
                        path: '',
                        element: <Navigate to="index" replace />,
                    },
                ],
            },
        ],
    },
]);
