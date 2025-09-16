// src/features/auth/AuthTest.js
import React, { useState } from 'react';
import { useRegisterMutation, useLoginMutation, useLogoutMutation, useGetMeQuery, useUpdateProfileMutation, useChangePasswordMutation } from './authSlice';

const AuthTest = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    telephone: '',
    newPassword: '',
    currentPassword: ''
  });

  // RTK Query hooks
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();
  const [updateProfile] = useUpdateProfileMutation();
  const [changePassword] = useChangePasswordMutation();
  const { data: user, error, isLoading } = useGetMeQuery();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const result = await register({
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        telephone: formData.telephone,
        password: formData.password,
        password_confirmation: formData.password
      }).unwrap();
      console.log('Registration successful:', result);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await login({
        email: formData.email,
        password: formData.password
      }).unwrap();
      console.log('Login successful:', result);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const result = await updateProfile({
        firstname: formData.firstname,
        lastname: formData.lastname,
        telephone: formData.telephone,
        email: formData.email
      }).unwrap();
      console.log('Profile update successful:', result);
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const result = await changePassword({
        current_password: formData.currentPassword,
        password: formData.newPassword,
        password_confirmation: formData.newPassword
      }).unwrap();
      console.log('Password change successful:', result);
    } catch (error) {
      console.error('Password change failed:', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Authentication Test UI</h1>
      
      {/* User Info */}
      <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <h2>Current User</h2>
        {isLoading && <p>Loading user data...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
        {user && (
          <div>
            <p>Name: {user.firstname} {user.lastname}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.telephone}</p>
          </div>
        )}
      </div>

      {/* Register Form */}
      <form onSubmit={handleRegister} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <h2>Register</h2>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="telephone"
          placeholder="Phone"
          value={formData.telephone}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Register</button>
      </form>

      {/* Login Form */}
      <form onSubmit={handleLogin} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Login</button>
      </form>

      {/* Update Profile Form */}
      <form onSubmit={handleUpdateProfile} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <h2>Update Profile</h2>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="telephone"
          placeholder="Phone"
          value={formData.telephone}
          onChange={handleInputChange}
        />
        <button type="submit">Update Profile</button>
      </form>

      {/* Change Password Form */}
      <form onSubmit={handleChangePassword} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <h2>Change Password</h2>
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={formData.currentPassword}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Change Password</button>
      </form>

      {/* Logout Button */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleLogout} style={{ padding: '10px 20px' }}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AuthTest;