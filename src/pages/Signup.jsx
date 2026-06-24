import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "https://todo-backend-eh89.onrender.com";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {


if (
  !name.trim() ||
  !email.trim() ||
  !password.trim() ||
  !securityQuestion.trim() ||
  !securityAnswer.trim()
) {
  alert("Please fill all fields");
  return;
}


    try {
      const res = await axios.post(
        `${BASE_URL}/api/auth/signup`,
        {
          name,
          email,
          password,
          securityQuestion,
          securityAnswer,
        }
      );

      alert(res.data.message);
      navigate("/");
    } catch (error) {
  alert(
    error.response?.data?.message ||
    "Signup Failed"
  );

  console.log(error);
}
  };

  return (
    <div className="container mt-5">
      <h2>Signup</h2>

      <input
        type="text"
        placeholder="Enter Name"
        className="form-control mb-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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

      {/* SECURITY QUESTION */}
      <input
        type="text"
        placeholder="Security Question (e.g. Your pet name?)"
        className="form-control mb-3"
        value={securityQuestion}
        onChange={(e) => setSecurityQuestion(e.target.value)}
      />

      {/* SECURITY ANSWER */}
      <input
        type="text"
        placeholder="Answer"
        className="form-control mb-3"
        value={securityAnswer}
        onChange={(e) => setSecurityAnswer(e.target.value)}
      />

      <button
        className="btn btn-success"
        onClick={handleSignup}
      >
        Signup
      </button>

      <p className="mt-3">
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Signup;