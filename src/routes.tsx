import { createBrowserRouter } from "react-router-dom";
import { Register } from "./pages/register"; // Named import
import { Login } from "./pages/login";
import App from "./App";
import { Hoteis } from "./pages/Hoteis";
import HotelDetails from "./pages/HotelDetails";
import { Profile } from "./pages/profile";
export const router = createBrowserRouter([
  {
    path: '/register',
    element: <Register />, // Component name should be uppercase and properly formatted
  },

  {
    path: '/profile',
    element: <Profile/> // Component name should be uppercase and properly formatted
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
    path: '/hoteis/:id',
    element: <HotelDetails />, // Component name should be uppercase and properly formatted

  },

  {
    path: '/hoteis',
    element: <Hoteis />, // Component name should be uppercase and properly formatted

  },
]);
