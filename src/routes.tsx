import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const HomePage = lazy(() => import("@/pages/HomePage"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
];
