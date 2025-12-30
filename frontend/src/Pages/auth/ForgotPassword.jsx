import { useState } from 'react';
import axios from 'axios';

// ✅ API base URL from .env
const API_URL = process.env.REACT_APP_API_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/forgot-password`,
        { email }
      );

      if (res.data.message === 'Reset link sent to your email') {
        setMessage(res.data.message);
      } else {
        setError('Email not found. Please check and try again.');
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="forgot-password-page">
      <h2>Forgot Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" className="login-btn">
          Send Reset Link
        </button>
      </form>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ForgotPassword;
