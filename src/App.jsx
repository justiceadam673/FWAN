import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import SidebarLayout from "./layouts/SidebarLayout"; // layout with Sidebar
import LandingPage from "./COMPONENTS/LANDING-PAGE/pages/LandingPage";
import SignUp from "./COMPONENTS/ACCESS-INPUTS/SignUp";
import SignIn from "./COMPONENTS/ACCESS-INPUTS/SignIn";
import Dashboard from "./COMPONENTS/BUYERS/pages/Dashboard";
import Listings from "./COMPONENTS/BUYERS/pages/Listing";
import Offers from "./COMPONENTS/BUYERS/pages/Offers";
import History from "./COMPONENTS/BUYERS/pages/History";
import Profile from "./COMPONENTS/BUYERS/pages/Profile";
import HeaderFooter from "./layouts/HeaderFooter"; // layout with Header and Footer
import Collections from "./COMPONENTS/LANDING-PAGE/pages/Collections";
import AboutUs from "./COMPONENTS/LANDING-PAGE/pages/AboutUs";
import ContactUs from "./COMPONENTS/LANDING-PAGE/pages/ContactUs";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Routes without layout */}
      <Route path='/' element={<LandingPage />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />

      {/* Routes with Sidebar layout */}
      <Route element={<SidebarLayout />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/listings' element={<Listings />} />
        <Route path='/offers' element={<Offers />} />
        <Route path='/history' element={<History />} />
        <Route path='/profile' element={<Profile />} />
      </Route>
      <Route element={<HeaderFooter />}>
        <Route path='/collections' element={<Collections />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/contactus' element={<ContactUs />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
