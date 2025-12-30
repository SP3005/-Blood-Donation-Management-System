import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// ✅ API base URL from .env
const API_URL = process.env.REACT_APP_API_URL;

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/reset-password/${token}`,
        { newPassword }
      );

      setMessage(res.data.message);
    } catch (err) {
      console.error("Reset password error:", err);
      setError(
        err.response?.data?.message ||
        "Failed to reset password. Link may be invalid or expired."
      );
    }
  };

  return (
    <div className="reset-password-page">
      <h2>Reset Your Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <button type="submit">
          Reset Password
        </button>
      </form>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ResetPassword;
