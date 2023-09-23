import "./App.css";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Post from "./components/Post";
import AddPost from "./components/AddPost";
import ResetPassword from "./components/ResetPassword";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/post",
        element: <Post />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/addpost",
        element: <AddPost />,
      },
      {
        path: "/resetpassword",
        element: <ResetPassword />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
