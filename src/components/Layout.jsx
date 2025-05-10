
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartButton from "./CartButton";
import Cart from "./Cart";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar>
        <CartButton />
      </Navbar>
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Cart />
      <Footer />
    </div>
  );
};

export default Layout;
