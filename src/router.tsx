import { createBrowserRouter, redirect } from "react-router-dom";
import { HallLayout } from "./components/HallLayout";
import AuthLayout from "./components/AuthLayout";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { RouteAuthProvider, protectedLoader } from "./auth";
import { registerAction, loginAction } from "./actions";
import RocketPage from "./pages/games/RocketPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HallLayout />,
    children: [
      {
        index: true,
        loader: protectedLoader,
        element: <HomePage />,
      },
      {
        path: "/about",
        loader: protectedLoader,
        element: <div>About</div>,
      },
      {
        path: "/games/rocket",
        loader: protectedLoader,
        element: <RocketPage />,
      },
    ],
  },
  {
    path: "/admin/*",
    element: <AdminPage />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        action: loginAction,
        element: <LoginPage />,
      },
      {
        path: "logout",
        action: async () => {
          await new Promise((r) => setTimeout(r, 500)); // fake delay
          localStorage.removeItem("token");
          RouteAuthProvider.isAuthenticated = false;
          console.log("logout");
          return redirect("/");
        },
      },
      {
        path: "register",
        action: registerAction,
        element: <RegisterPage />,
      },
    ],
  },
]);
