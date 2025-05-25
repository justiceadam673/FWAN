import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BuyersSidebarLayout from "./layouts/BuyersSidebarLayout";
import LandingPage from "./COMPONENTS/LANDING-PAGE/pages/LandingPage";
import BuyersDashboard from "./COMPONENTS/BUYERS/pages/BuyersDashboard";
import BuyersListing from "./COMPONENTS/BUYERS/pages/BuyersListing";
import BuyersOffers from "./COMPONENTS/BUYERS/pages/BuyersOffers";
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
import ProtectedRoute from "./COMPONENTS/AUTH/util/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<LandingPage />} />

      <Route element={<BuyersSidebarLayout />}>
        <Route
          path='/buyersdashboard'
          element={
            <ProtectedRoute>
              <BuyersDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/buyerslistings'
          element={
            <ProtectedRoute>
              <BuyersListing />
            </ProtectedRoute>
          }
        />
        <Route
          path='/buyersoffers'
          element={
            <ProtectedRoute>
              <BuyersOffers />
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
          path='/buyersprofile'
          element={
            <ProtectedRoute>
              <BuyersProfile />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route element={<FarmersSidebarLayout />}>
        <Route element={<DashBoardLayout />}>
          <Route
            path='/farmersdashboard'
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
