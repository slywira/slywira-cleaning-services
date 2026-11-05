import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Homecleaning from "./pages/Homecleaning";
import Officecleaning from "./pages/Officecleaning";
import Carpetcleaning from "./pages/Carpetcleaning";
import Movingout from "./pages/Movingout";
import Login from "./pages/login";
import Signup from "./pages/signup";
import backgroundimage from "./assets/backgroundimage.png";

function App() {
const [page, setPage] = useState("home");
  return (
    <div
      className="main-background"
      style={
        page === "home" || page === "login" || page === "signup"
          ? {
              backgroundImage: `url(${backgroundimage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          
          : {
        backgroundColor: "#121F2A",
        backgroundImage: "none",
      }}
    >
       <Navbar navigate={setPage} />
      {page === "home" && <Home setPage={setPage}/>}
      {page === "services" && <Services setPage={setPage}/>}
      {page === "about" && <About />}
      {page === "contact" && <Contact />}
      {page === "homecleaning" && <Homecleaning setPage={setPage}/>}
      {page === "officecleaning" && <Officecleaning setPage={setPage}/>}
      {page === "carpetcleaning" && <Carpetcleaning setPage={setPage}/>}
      {page === "movingout" && <Movingout setPage={setPage}/>}
      {page === "login" && <Login setPage={setPage}/>}
      {page === "signup" && <Signup setPage={setPage}/>}
      
    </div>
  );
}

export default App;
