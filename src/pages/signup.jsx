
import { useState } from "react";
import { getSupabaseClient } from "../supabaseClient";
import "./signup.css";

function Signup({ setPage }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must contain at least 8 characters.");
      return;
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      setMessage("Account creation is not configured. Please contact the site owner.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            full_name: fullName.trim(),
            phone: phone.trim()
          }
        }
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      if (data.session) {
        setMessage("Account created successfully! You can now log in.");
      } else {
        setMessage(
          "Account created! Please check your email to confirm your account."
        );
      }

      setFullName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");

    } catch (error) {
      setMessage("Something went wrong. Please try again.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signuppage">

      <div className="signup-overlay"></div>

      <div className="signupcontainer">

        <h1>CREATE YOUR ACCOUNT</h1>

        <p className="signup-description">
          Book and Manage your services easily
        </p>

        <h3 className="form-heading">CREATE AN ACCOUNT</h3>

        <form onSubmit={handleSignup}>

          <div className="signup-input">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="signup-input">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="signup-input">
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="signup-input">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength="8"
              required
            />
          </div>

          <div className="signup-input">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="terms">
            <label>
              <input type="checkbox" required />
              I agree to the terms and conditions
            </label>
          </div>

          {message && (
            <p className="signup-message" role="status">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="signup"
            disabled={loading}
          >
            {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            {!loading && <span> ➜</span>}
          </button>

        </form>

        <h4>
          Already have an account?
          <span onClick={() => setPage("login")}> Login</span>
        </h4>

      </div>
    </div>
  );
}

export default Signup;
