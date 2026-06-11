import { useState, useEffect } from 'react';
import axios from 'axios';

const Account = ({ user, onLogout }) => {
  const [userData, setUserData] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name || '', phone: user.phone || '' });
    }
  }, [user]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/api/auth/profile',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserData(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      setIsEditing(false);
      setMessage('Profile updated successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
  };

  if (!userData) return null;

  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      paddingLeft: "40px",
      paddingRight: "20px",
      paddingTop: "80px",
    }}>
      <div style={{
        maxWidth: "400px",
        width: "100%",
        background: "rgba(139, 90, 43, 0.05)",
        borderRadius: "16px",
        padding: "40px 30px",
      }}>
        <h2 style={{ color: '#5C3A1E', marginBottom: '20px' }}>My Account</h2>
        
        {message && (
          <div style={{ color: 'green', marginBottom: '15px', textAlign: 'center' }}>
            {message}
          </div>
        )}
        
        {!isEditing ? (
          <div>
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#5C3A1E' }}>Name:</strong>
              <p style={{ color: '#8B5A2B', marginTop: '5px' }}>{userData.name || 'Not set'}</p>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#5C3A1E' }}>Email:</strong>
              <p style={{ color: '#8B5A2B', marginTop: '5px' }}>{userData.email}</p>
            </div>
            <div style={{ marginBottom: '25px' }}>
              <strong style={{ color: '#5C3A1E' }}>Phone:</strong>
              <p style={{ color: '#8B5A2B', marginTop: '5px' }}>{userData.phone || 'Not set'}</p>
            </div>
            
            <div style={{ display: 'flex', gap: '15px' }}>
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  padding: '10px 20px',
                  background: '#8B5A2B',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                style={{
                  padding: '10px 20px',
                  background: 'transparent',
                  color: '#8B5A2B',
                  border: '1px solid #8B5A2B',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleEdit}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', color: '#5C3A1E', marginBottom: '8px' }}>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #8B5A2B',
                  borderRadius: '8px',
                }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', color: '#5C3A1E', marginBottom: '8px' }}>Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #8B5A2B',
                  borderRadius: '8px',
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button
                type="submit"
                style={{
                  padding: '10px 20px',
                  background: '#8B5A2B',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                style={{
                  padding: '10px 20px',
                  background: 'transparent',
                  color: '#8B5A2B',
                  border: '1px solid #8B5A2B',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
    
  );
};

export default Account;