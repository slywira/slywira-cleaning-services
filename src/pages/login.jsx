
import { useState } from "react";
import { authenticateDemoUser, setSupabaseAuthUser } from "../utils/demoData";
import { getAppProfile } from "../utils/appData";
import { getSupabaseClient } from "../supabaseClient";
import "./login.css";

function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const supabase = getSupabaseClient();
      const result = supabase
        ? await supabase.auth.signInWithPassword({ email, password })
        : authenticateDemoUser({ email, password });

      if (result.error) {
        setMessage(result.error.message);
        return;
      }

      if (!supabase && !result.success) {
        setMessage(result.message);
        return;
      }

      const profile = supabase ? await getAppProfile(result.data.user) : null;
      const user = supabase
        ? setSupabaseAuthUser(result.data.user, profile)
        : result.user;
      if (user.role === "admin") {
        setPage("adminDashboard");
      } else {
        setPage("customerDashboard");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginpage">
      <div className="logincontainer">
        <h1>Welcome Back</h1>
        <h2>Login to manage your cleaning services</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="button-text">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>
            <button
              type="button"
              className="forgot-password-link"
              onClick={() => setPage("forgotPassword")}
            >
              Forgot password?
            </button>
          </div>

          {message && (
            <p className="login-message" role="alert">
              {message}
            </p>
          )}

          <button type="submit" className="login" disabled={loading}>
            {loading ? "LOGGING IN..." : "LOGIN"}
          </button>
        </form>

        <h4>
          Don&apos;t have an account?{" "}
          <button
            type="button"
            className="auth-inline-button"
            onClick={() => setPage("signup")}
          >
            Sign Up
          </button>
        </h4>
      </div>
    </div>
  );
}

export default Login;
