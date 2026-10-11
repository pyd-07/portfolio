import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";

const Layout = () => {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { pathname } = useLocation();

  // Reset scroll position when navigating between pages
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar openPalette={() => setPaletteOpen(true)} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
    </div>
  );
};

export default Layout;
