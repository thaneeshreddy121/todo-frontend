import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://todo-backend-eh89.onrender.com";

function ForgotPassword() {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  // STEP 1: Get security question
  const handleGetQuestion = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/auth/forgot`,
        { email }
      );

      setQuestion(res.data.securityQuestion);
      setStep(2);
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  // STEP 2: Verify answer
  const handleVerifyAnswer = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/auth/verify-answer`,
        { email, answer }
      );

      setStep(3);
    } catch (error) {
      alert(error.response?.data?.message || "Wrong answer");
    }
  };

  // STEP 3: Reset password
  const handleResetPassword = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/auth/reset-password`,
        { email, newPassword }
      );

      alert("Password updated successfully");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Forgot Password</h2>

      {/* STEP 1 */}
      {step === 1 && (
        <div>
          <input
            type="email"
            placeholder="Enter Email"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="btn btn-primary"
            onClick={handleGetQuestion}
          >
            Get Security Question
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div>
          <h5>{question}</h5>

          <input
            type="text"
            placeholder="Enter Answer"
            className="form-control mb-3"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <button
            className="btn btn-warning"
            onClick={handleVerifyAnswer}
          >
            Verify Answer
          </button>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div>
          <input
            type="password"
            placeholder="New Password"
            className="form-control mb-3"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button
            className="btn btn-success"
            onClick={handleResetPassword}
          >
            Reset Password
          </button>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;