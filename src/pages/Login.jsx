import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "https://todo-backend-eh89.onrender.com";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      // ✅ IMPORTANT FIX: store user for multi-user system
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(res.data.message);

      navigate("/home");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter Email"
        className="form-control mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        className="form-control mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>

      <p className="mt-3">
        Don't have an account?{" "}
        <Link className="blue" to="/signup">Signup</Link>
      </p>

      <Link className="blue" to="/forgot">Forgot Password?</Link>
    </div>
  );
}

export default Login;