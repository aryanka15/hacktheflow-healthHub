import { React } from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import App from "./pages/App";
import Longterm from "./pages/Longterm";
import Results from "./pages/Results";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SymptomSolver from "./pages/SymptomSolver";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "longterm",
    element: <Longterm></Longterm>,
  },
  {
    path: "results",
    element: <Results></Results>,
  },
  {
    path: "login",
    element: <Login></Login>,
  },
  {
    path: "signup",
    element: <Signup></Signup>,
  },
  {
    path: "symptoms",
    element: <SymptomSolver></SymptomSolver>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router}></RouterProvider>);
