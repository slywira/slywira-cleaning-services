import { useState } from "react";
import { getSupabaseClient } from "../supabaseClient";
import { signOutDemoUser } from "../utils/demoData";
import "./login.css";
import "./resetpassword.css";

function ResetPassword({ setPage }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setErrorMessage("");

    if (password.length < 8) {
      setErrorMessage("Password must contain at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      setErrorMessage("Password reset requires Supabase Auth configuration.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setErrorMessage(error.message);
        return;
      }

      setPassword("");
      setConfirmPassword("");
      const { error: signOutError } = await supabase.auth.signOut();
      signOutDemoUser();
      if (signOutError) {
        setErrorMessage(`Your password was updated, but sign-out failed: ${signOutError.message}`);
        return;
      }

      window.history.replaceState({}, "", window.location.pathname);
      setMessage("Your password has been updated. You can now log in with the new password.");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to update your password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginpage reset-password-page">
      <div className="logincontainer">
        <h1>Choose a New Password</h1>
        <h2>Use at least 8 characters for your new password.</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength="8"
            autoComplete="new-password"
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            minLength="8"
            autoComplete="new-password"
            required
          />
          {(message || errorMessage) && (
            <p className="login-message" role={errorMessage ? "alert" : "status"}>
              {errorMessage || message}
            </p>
          )}
          {message ? (
            <button type="button" className="login" onClick={() => setPage("login")}>
              GO TO LOGIN
            </button>
          ) : (
            <button type="submit" className="login" disabled={loading}>
              {loading ? "UPDATING..." : "UPDATE PASSWORD"}
            </button>
          )}
        </form>
        <h4>
          Reset link expired?{" "}
          <button className="auth-text-button" onClick={() => setPage("forgotPassword")}>
            Request another
          </button>
        </h4>
      </div>
    </div>
  );
}

export default ResetPassword;
