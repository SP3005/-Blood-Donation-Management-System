import { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });

      // Check if the email exists in the database
      if (res.data.message === 'Reset link sent to your email') {
        setMessage(res.data.message); // Success message from the backend
      } else {
        setError("Email not found. Please check and try again.");
      }
    } catch (err) {
      // Handle unexpected errors (e.g., network issues)
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="login-btn">Send Reset Link</button>
      </form>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ForgotPassword;
