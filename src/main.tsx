import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProjectById, {
  loader as ProjectByIdLoader,
} from "./routes/project/[id]";
import SignupPage from "./routes/auth/signup";
import LoginPage from "./routes/auth/login";
import ProjectIndexPage, {
  loader as ProjectIndexLoader,
} from "./routes/project";

const router = createBrowserRouter([
  {
    path: "/project/:projectId",
    element: <ProjectById />,
    loader: ProjectByIdLoader,
  },
  {
    path: "/auth/signup",
    element: <SignupPage />,
  },
  {
    path: "/auth/signin",
    element: <LoginPage />,
  },
  {
    path: "/projects",
    element: <ProjectIndexPage />,
    loader: ProjectIndexLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
