import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear authentication data
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');

    // Redirect to login page after 3 seconds
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>You have been logged out</h1>
      <p style={styles.text}>Redirecting you to the login page...</p>
      <button 
        style={styles.button} 
        onClick={() => navigate('/login')}
      >
        Go to Login
      </button>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '100px 10%',
    background: '#f5f5f5',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: '3rem',
    color: '#d9534f',
    marginBottom: '20px',
  },
  text: {
    fontSize: '1.5rem',
    color: '#555',
    marginBottom: '30px',
  },
  button: {
    padding: '12px 30px',
    fontSize: '1.2rem',
    background: '#5cb85c',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.3s',
    textTransform: 'uppercase',
    borderRadius: '5px',
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
  },
  buttonHover: {
    background: '#d9534f',
  }
};

export default Logout;