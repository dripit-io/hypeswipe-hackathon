import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const HomePage = lazy(() => import("@/pages/HomePage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));

export const routes: RouteObject[] = [
  { path: "/", element: <HomePage /> },
  { path: "/profile", element: <ProfilePage /> },
];
