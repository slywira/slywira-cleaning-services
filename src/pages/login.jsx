import "./login.css";
function Login() {
  return (
    <div className="loginpage">
      <div className="logincontainer">
<h1>Welcome Back</h1>
<h2>Login to manage your cleaning services</h2>
<button className="email">Email Address</button>
<button className="password">Password</button>

<div className="button-text">
<button className="rememberme"></button>
<h3>Remember Me</h3>
</div>
<button className="login">Login</button>
<h4>Don't have an account ? <span>Sign Up</span></h4>
</div>
</div>

      );
}

export default Login;