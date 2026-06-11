import { useState } from 'react';
import axios from 'axios';

const Register = ({ onRegister, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...userData } = formData;
      const response = await axios.post('http://localhost:5000/api/auth/register', userData);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      onRegister(response.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      paddingLeft: "40px",
      paddingRight: "20px",
      paddingTop: "10px",
    }}>
      <div style={{
        maxWidth: "400px",
        width: "100%",
        background: "rgba(139, 90, 43, 0.05)",
        borderRadius: "16px",
        padding: "40px 30px",
      }}>
      <h2 style={{ color: '#5C3A1E', textAlign: 'center', marginBottom: '30px' }}>Register for Olive</h2>
      
      {error && (
        <div style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', color: '#5C3A1E', marginBottom: '8px' }}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #8B5A2B',
              borderRadius: '8px',
            }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', color: '#5C3A1E', marginBottom: '8px' }}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #8B5A2B',
              borderRadius: '8px',
            }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', color: '#5C3A1E', marginBottom: '8px' }}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #8B5A2B',
              borderRadius: '8px',
            }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', color: '#5C3A1E', marginBottom: '8px' }}>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #8B5A2B',
              borderRadius: '8px',
            }}
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', color: '#5C3A1E', marginBottom: '8px' }}>Phone (Optional)</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #8B5A2B',
              borderRadius: '8px',
            }}
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            background: '#8B5A2B',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={onSwitchToLogin}
          style={{
            background: 'none',
            border: 'none',
            color: '#8B5A2B',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          Already have an account? Login
        </button>
      </div>
    </div>
</div>
  );
};

export default Register;