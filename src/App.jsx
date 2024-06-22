import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Search from "./pages/Search";
import SingleGIF from "./pages/SingleGIF";
import Favorites from "./pages/Favorites";
import AppLayout from "./layout/AppLayout";
import GifProvider from "./context/gif-context";

const router = createBrowserRouter([
  {
    element: <AppLayout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:category",
        element: <Category />,
      },
      {
        path: "/search/:query",
        element: <Search />,
      },
      {
        path: "/:type/:slug",
        element: <SingleGIF />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
    ],
  },
]);

function App() {
  return (
    <GifProvider>
      <RouterProvider router={router} />
    </GifProvider>
  );
}

export default App;
