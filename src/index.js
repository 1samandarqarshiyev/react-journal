import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";
import App from "./components/Home";
import EntryDetail from "./components/EntryDetail";
import Register from "./components/Register";
import Authenticate from "./components/Authenticate";
import Nav from "./components/Nav";
import { AuthProvider } from "./contexts/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
// Wrapper for application to set the layout with navbar
const AppLayout = () => {
  const location = useLocation();
  return (
    <>
      <AuthProvider>
        <Nav />
        <AnimatePresence mode="wait">
          <main>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              key={location.pathname}
            >
              <Outlet />
            </motion.div>
          </main>
        </AnimatePresence>
      </AuthProvider>
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <App />,
        // errorElement: <ErrorPage />,
      },
      {
        path: "entry/:id",
        element: <EntryDetail />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "authenticate",
        element: <Authenticate />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Nav /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
