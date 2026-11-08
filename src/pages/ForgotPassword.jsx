import { useState } from "react";
import { getSupabaseClient } from "../supabaseClient";
import "./login.css";
import "./forgotpassword.css";

function ForgotPassword({ setPage }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setErrorMessage("");

    const supabase = getSupabaseClient();
    if (!supabase) {
      setErrorMessage("Password reset requires Supabase Auth configuration.");
      return;
    }

    setLoading(true);
    try {
      const redirectTo = new URL("?page=resetPassword", window.location.origin).toString();
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
      if (error) {
        setErrorMessage(error.message);
        return;
      }

      setMessage("If an account exists for that email, a password reset link has been sent.");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to send the reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginpage forgot-password-page">
      <div className="logincontainer">
        <h1>Reset Password</h1>
        <h2>Enter the email address linked to your account.</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          {(message || errorMessage) && (
            <p className="login-message" role={errorMessage ? "alert" : "status"}>
              {errorMessage || message}
            </p>
          )}
          <button type="submit" className="login" disabled={loading}>
            {loading ? "SENDING..." : "SEND RESET LINK"}
          </button>
        </form>
        <h4>
          Remembered your password?{" "}
          <button className="auth-text-button" onClick={() => setPage("login")}>Log in</button>
        </h4>
      </div>
    </div>
  );
}

export default ForgotPassword;
