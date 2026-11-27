import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import HotelListPage from "./pages/HotelListPage.jsx";
import AddHotelPage from "./pages/AddHotelPage.jsx";
import EditHotelPage from "./pages/EditHotelPage.jsx";
import HotelDetailsPage from "./pages/HotelDetailsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ExtrasPage from "./pages/ExtrasPage.jsx"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HotelListPage /> },
      { path: "add", element: <AddHotelPage /> },
      { path: "edit/:id", element: <EditHotelPage /> },
      { path: "hotel/:id", element: <HotelDetailsPage /> },
      { path: "extras", element: <ExtrasPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;