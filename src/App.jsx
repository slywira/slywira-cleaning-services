
import { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import { getCurrentUser, setSupabaseAuthUser, signOutDemoUser } from "./utils/demoData";
import { getAppProfile } from "./utils/appData";
import { getSupabaseClient } from "./supabaseClient";

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
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import AdminDashboard from "./dashboards/admin/admindashboard";
import CustomerDashboard from "./dashboards/customer/customerdashboard";

import backgroundimage from "./assets/backgroundimage.png";

function App() {
  const [authError, setAuthError] = useState("");
  const [page, setPage] = useState(() => {
    const requestedPage = new URLSearchParams(window.location.search).get("page");
    if (requestedPage === "resetPassword") return "resetPassword";

    const user = getCurrentUser();
    if (!user) return "home";

    return user.role === "admin" ? "adminDashboard" : "customerDashboard";
  });

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return undefined;

    let active = true;
    let authChangeCount = 0;
    const initialAuthChangeCount = authChangeCount;
    const isPasswordReset = () =>
      new URLSearchParams(window.location.search).get("page") === "resetPassword";
    const routeForUser = async (authUser) => {
      try {
        const profile = await getAppProfile(authUser);
        if (!active) return;
        const user = setSupabaseAuthUser(authUser, profile);
        setAuthError("");
        setPage(user.role === "admin" ? "adminDashboard" : "customerDashboard");
      } catch (error) {
        if (active) {
          setAuthError(error instanceof Error ? error.message : "Unable to load your Supabase profile.");
          await supabase.auth.signOut();
          signOutDemoUser();
          setPage("login");
        }
      }
    };

    supabase.auth.getSession().then(({ data, error }) => {
      if (!active || authChangeCount !== initialAuthChangeCount) return;
      if (error) {
        setAuthError(`Unable to restore your Supabase session: ${error.message}`);
        return;
      }

      if (data.session?.user) {
        if (!isPasswordReset()) {
          routeForUser(data.session.user);
        }
      } else {
        signOutDemoUser();
        if (!isPasswordReset()) setPage("home");
      }
    }).catch((error) => {
      if (active && authChangeCount === initialAuthChangeCount) {
        signOutDemoUser();
        if (!isPasswordReset()) setPage("home");
        setAuthError(error instanceof Error ? error.message : "Unable to restore your Supabase session.");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;
      if (event === "PASSWORD_RECOVERY" || isPasswordReset()) return;

      if (event === "SIGNED_IN" && session?.user) {
        authChangeCount += 1;
      } else if (event === "SIGNED_OUT") {
        authChangeCount += 1;
        signOutDemoUser();
        setPage("home");
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const showBackgroundImage = ["home", "login", "signup", "forgotPassword", "resetPassword"].includes(page);
  const isDashboard = ["adminDashboard", "customerDashboard"].includes(page);

  return (
    <div
      className="main-background"
      style={
        showBackgroundImage
          ? {
              backgroundImage: `url(${backgroundimage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : {
              backgroundColor: "#121F2A",
              backgroundImage: "none",
            }
      }
    >
      {!isDashboard && <Navbar navigate={setPage} />}

      {authError && <p className="auth-connection-error" role="alert">{authError}</p>}
      {page === "home" && <Home setPage={setPage} />}
      {page === "services" && <Services setPage={setPage} />}
      {page === "about" && <About />}
      {page === "contact" && <Contact />}

      {page === "homecleaning" && <Homecleaning setPage={setPage} />}
      {page === "officecleaning" && <Officecleaning setPage={setPage} />}
      {page === "carpetcleaning" && <Carpetcleaning setPage={setPage} />}
      {page === "movingout" && <Movingout setPage={setPage} />}

      {page === "login" && <Login setPage={setPage} />}
      {page === "signup" && <Signup setPage={setPage} />}
      {page === "forgotPassword" && <ForgotPassword setPage={setPage} />}
      {page === "resetPassword" && <ResetPassword setPage={setPage} />}

      {page === "adminDashboard" && <AdminDashboard setPage={setPage} />}
      {page === "customerDashboard" && <CustomerDashboard setPage={setPage} />}
    </div>
  );
}

export default App;
