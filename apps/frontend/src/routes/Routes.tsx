import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { PrivateTemplate, PublicTemplate } from "../Template";
import { HomeRoutes, SignInRoutes, SignUpRoutes } from "./Modules";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "sign-in",
        element: <PublicTemplate />,
        children: [SignInRoutes],
      },
      {
        path: "sign-up",
        element: <PublicTemplate />,
        children: [SignUpRoutes],
      },
      {
        path: "/",
        element: <PrivateTemplate />,
        children: [HomeRoutes],
      },
    ],
  },
]);
