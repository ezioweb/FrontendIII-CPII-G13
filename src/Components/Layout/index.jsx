import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import { useTheme } from "../../Hooks/useTheme";
import Footer from "../Footer";
import Navbar from "../Navbar";

export function Layout() {
  const { theme } = useTheme()
  const { token } = useAuth()
  const navigate = useNavigate()

  const isLogged = () => {
    if (token == null || token === 'null' || token.trim() === '') {
      navigate('login')
    } else {
      navigate('home')
    }
  }
  useEffect(() => {
    isLogged()    
  })  

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar a classe dark ou light */}
      <div className={`app ${theme}`}>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
