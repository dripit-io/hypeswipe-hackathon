import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const HomePage = lazy(() => import("@/pages/HomePage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));

export const routes: RouteObject[] = [
  { path: "/", element: <HomePage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/login", element: <LoginPage /> }
];
