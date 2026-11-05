
import "./login.css";

function Login({ setPage }) {
  return (
    <div className="loginpage">
      <div className="logincontainer">

        <h1>Welcome Back</h1>
        <h2>Login to manage your cleaning services</h2>

        <form>
          <input
            type="email"
            placeholder="Email Address"
            required
          />

          <input
            type="password"
            placeholder="Password"
            required
          />

          <div className="button-text">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>
          </div>

          <button type="submit" className="login">
            Login
          </button>
        </form>

        <h4>
          Don't have an account?{" "}
          <span onClick={() => setPage("signup")}>
            Sign Up
          </span>
        </h4>

      </div>
    </div>
  );
}

export default Login;
