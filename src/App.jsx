import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./COMPONENTS/BUYERS/components/Sidebar";
import Dashboard from "./COMPONENTS/BUYERS/pages/Dashboard";
import Listings from "./COMPONENTS/BUYERS/pages/Listing";
import Offers from "./COMPONENTS/BUYERS/pages/Offers";
import History from "./COMPONENTS/BUYERS/pages/History";
import Profile from "./COMPONENTS/BUYERS/pages/Profile";

function App() {
  return (
    <Router>
      <div className='flex h-screen bg-[#EAEAEA]'>
        <Sidebar />
        <div className='flex-1 p-4 overflow-y-auto'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/listings' element={<Listings />} />
            <Route path='/offers' element={<Offers />} />
            <Route path='/history' element={<History />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
