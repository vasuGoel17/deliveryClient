import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Travelling from "./components/travelling";
import Login from "./components/login";
import Home from "./components/home";
import Event from "./components/event";
import Deliveries from "./components/deliveries";
import Searchd from "./components/searchd";
import Searcht from "./components/searcht";
import Create_event from "./components/create_event";
import Error from "./components/Error";
import Register from "./components/register";

// root routes
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Login />
      </div>
    ),
  },
  {
    path: "/searchd",
    element: (
      <div>
        <Searchd />
      </div>
    ),
  },
  {
    path: "/searcht",
    element: (
      <div>
        <Searcht />
      </div>
    ),
  },
  {
    path: "/register",
    element: (
      <div>
        <Register />
      </div>
    ),
  },
  {
    path: "/home",
    element: (
      <div>
        <Home />
      </div>
    ),
  },
  {
    path: "*",
    element: (
      <div>
        <Error />
      </div>
    ),
  },
  // {
  //   path: "/travel_details",
  //   element: (
  //     <div>
  //       <Travel_details />
  //     </div>
  //   ),
  // },
  {
    path: "/login",
    element: (
      <div>
        <Login />
      </div>
    ),
  },
  {
    path: "/travelling",
    element: (
      <div>
        <Travelling />
      </div>
    ),
  },
  {
    path: "/event",
    element: (
      <div>
        <Event />
      </div>
    ),
  },
  {
    path: "/deliveries",
    element: (
      <div>
        <Deliveries />
      </div>
    ),
  },
  {
    path: "/create_event",
    element: (
      <div>
        <Create_event />
      </div>
    ),
  },
  // {
  //   path: "/delivery_details",
  //   element: (
  //     <div>
  //       <Delivery_details />
  //     </div>
  //   ),
  // },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
