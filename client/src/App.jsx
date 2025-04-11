import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import { UserProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Nav></Nav>
        <Outlet></Outlet>
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <Signup></Signup>,
      },
    ],
  },
]);

const App = () => {
  return (
    <React.StrictMode>
      <UserProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer position='top-right' autoClose={3000}></ToastContainer>
      </UserProvider>
    </React.StrictMode>
  );
};

export default App;
