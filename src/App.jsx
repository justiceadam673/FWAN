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
// import FarmersVerification from "./COMPONENTS/FARMERS/";

// ✅ Only Route elements inside this
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<LandingPage />} />
      <Route element={<BuyersSidebarLayout />}>
        <Route path='/buyersdashboard' element={<BuyersDashboard />} />
        <Route path='/buyerslistings' element={<BuyersListing />} />
        <Route path='/buyersoffers' element={<BuyersOffers />} />
        <Route path='/buyershistory' element={<BuyersHistory />} />
        <Route path='/buyersprofile' element={<BuyersProfile />} />
      </Route>
      <Route element={<FarmersSidebarLayout />}>
        <Route path='/farmersdashboard' element={<FarmersDashboard />} />
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
      {/* <Route path='/farmerverification' element={<FarmersVerification />} /> */}
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
