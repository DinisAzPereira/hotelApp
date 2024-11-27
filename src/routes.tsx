import { createBrowserRouter } from "react-router-dom";
import { Register } from "./pages/register"; // Named import
import { Login } from "./pages/login";
import App from "./App";
import { Hoteis } from "./pages/Hoteis";
export const router = createBrowserRouter([
  {
    path: '/register',
    element: <Register />, // Component name should be uppercase and properly formatted
  },

  {
    path: '/',
    element: <App/>, // Component name should be uppercase and properly formatted
  },

  {
    path: '/login',
    element: <Login />, // Component name should be uppercase and properly formatted

  },

  {
    path: '/hoteis',
    element: <Hoteis />, // Component name should be uppercase and properly formatted

  },
]);
