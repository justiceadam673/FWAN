import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";

import BuyersSidebarLayout from "./layouts/BuyersSidebarLayout";
import LandingPage from "./COMPONENTS/LANDING-PAGE/pages/LandingPage";
import BuyersDashboard from "./COMPONENTS/BUYERS/pages/BuyersDashboard";
import BuyersCart from "./COMPONENTS/BUYERS/pages/BuyersCart";
import BuyersTracking from "./COMPONENTS/BUYERS/pages/BuyersTracking";
import BuyersHistory from "./COMPONENTS/BUYERS/pages/BuyersHistory";
import BuyersProfile from "./COMPONENTS/BUYERS/pages/BuyersProfile";
import HeaderFooter from "./layouts/HeaderFooter";
import Collections from "./COMPONENTS/LANDING-PAGE/pages/Collections";
import AboutUs from "./COMPONENTS/LANDING-PAGE/pages/AboutUs";
import ContactUs from "./COMPONENTS/LANDING-PAGE/pages/ContactUs";
import FarmerSignIn from "./COMPONENTS/AUTH/pages/FarmerSignIn";
import FarmerSignUp from "./COMPONENTS/AUTH/pages/FarmerSignUp";
import BuyerSignIn from "./COMPONENTS/AUTH/pages/BuyerSignIn";
import BuyerSignUp from "./COMPONENTS/AUTH/pages/BuyerSignUp";
import AuthRole from "./COMPONENTS/AUTH/pages/AuthRole";
import FarmersSidebarLayout from "./layouts/FarmersSidebarLayout";
import FarmersDashboard from "./COMPONENTS/FARMERS/pages/FarmersDashboard";
import FarmersListings from "./COMPONENTS/FARMERS/pages/FarmersListings";
import DashBoardLayout from "./layouts/DashBoardLayout";
import FarmersVerification from "./COMPONENTS/FARMERS/pages/FarmersVerification";
import ProtectedRoute from "./COMPONENTS/AUTH/ProtectedRoute";
import FarmersOffers from "./COMPONENTS/FARMERS/pages/FarmersOffers";
import FarmersHistory from "./COMPONENTS/FARMERS/pages/FarmersHistory";
import FarmersTracking from "./COMPONENTS/FARMERS/pages/FarmersTracking";
import FarmersProfile from "./COMPONENTS/FARMERS/pages/FarmersProfile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<LandingPage />} />

      <Route element={<BuyersSidebarLayout />}>
        <Route element={<DashBoardLayout />}>
          <Route
            path='/buyersoverview'
            element={
              <ProtectedRoute>
                <BuyersDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/buyerscart'
            element={
              <ProtectedRoute>
                <BuyersCart />
              </ProtectedRoute>
            }
          />
          <Route
            path='/buyershistory'
            element={
              <ProtectedRoute>
                <BuyersHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path='/buyerstracking'
            element={
              <ProtectedRoute>
                <BuyersTracking />
              </ProtectedRoute>
            }
          />
          <Route
            path='/buyersprofile'
            element={
              <ProtectedRoute>
                <BuyersProfile />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>

      <Route element={<FarmersSidebarLayout />}>
        <Route element={<DashBoardLayout />}>
          <Route
            path='/farmersoverview'
            element={
              <ProtectedRoute>
                <FarmersDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/farmerslisting'
            element={
              <ProtectedRoute>
                <FarmersListings />
              </ProtectedRoute>
            }
          />
          <Route
            path='/farmersoffers'
            element={
              <ProtectedRoute>
                <FarmersOffers />
              </ProtectedRoute>
            }
          />
          <Route
            path='/farmershistory'
            element={
              <ProtectedRoute>
                <FarmersHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path='/farmerstracking'
            element={
              <ProtectedRoute>
                <FarmersTracking />
              </ProtectedRoute>
            }
          />
          <Route
            path='/farmersprofile'
            element={
              <ProtectedRoute>
                <FarmersProfile />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>

      <Route element={<HeaderFooter />}>
        <Route path='/collections' element={<Collections />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/contactus' element={<ContactUs />} />
      </Route>

      <Route path='/farmersignin' element={<FarmerSignIn />} />
      <Route path='/farmersignup' element={<FarmerSignUp />} />
      <Route path='/buyersignin' element={<BuyerSignIn />} />
      <Route path='/buyersignup' element={<BuyerSignUp />} />
      <Route path='/role' element={<AuthRole />} />
      <Route path='/farmerverification' element={<FarmersVerification />} />
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position='top-right' autoClose={3000} />
    </>
  );
}

export default App;
