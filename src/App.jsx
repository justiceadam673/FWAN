import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Sidebar from "./COMPONENTS/BUYERS/components/Sidebar";
import Dashboard from "./COMPONENTS/BUYERS/pages/Dashboard";
import Listings from "./COMPONENTS/BUYERS/pages/Listing";
import Offers from "./COMPONENTS/BUYERS/pages/Offers";
import History from "./COMPONENTS/BUYERS/pages/History";
import Profile from "./COMPONENTS/BUYERS/pages/Profile";
import LandingPage from "./COMPONENTS/LANDING-PAGE/components/LandingPage";

function AppContent() {
  const location = useLocation();
  const isShow = location.pathname === "/";

  return (
    <>
      {isShow ? (
        <Routes>
          <Route path='/' element={<LandingPage />} />
        </Routes>
      ) : (
        <div className='lg:flex xl:flex 2xl:flex md:flex h-screen font-[Inter] '>
          <Sidebar />
          <div className='flex-1 p-4 overflow-y-auto'>
            <Routes>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/listings' element={<Listings />} />
              <Route path='/offers' element={<Offers />} />
              <Route path='/history' element={<History />} />
              <Route path='/profile' element={<Profile />} />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
