import { Outlet } from "react-router-dom/dist/umd/react-router-dom.development";
import Footer from "../Footer";
import Navbar from "../Navbar";

export function Layout() {
  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar a classe dark ou light */}
      <div className={`app light}`}>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
