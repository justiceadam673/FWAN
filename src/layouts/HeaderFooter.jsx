import { Outlet } from "react-router-dom";
import NavBar from "../COMPONENTS/LANDING-PAGE/components/NavBer";
import Footer from "../COMPONENTS/LANDING-PAGE/components/Footer";

const HeaderFooter = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />

      <main className='flex-grow mt-30'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default HeaderFooter;
