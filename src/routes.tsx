import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { AuthProvider } from "@/components/providers";

const HomePage = lazy(() => import("@/pages/HomePage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <AuthProvider>
        <HomePage />
      </AuthProvider>
    ),
  },
  {
    path: "/profile",
    element: (
      <AuthProvider>
        <ProfilePage />
      </AuthProvider>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    ),
  },
];
