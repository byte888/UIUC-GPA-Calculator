import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './GradeCalculator.module.css';

const Login: React.FC = () => {
  const [studentID, setstudentID] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // Add your authentication logic here
    if (studentID === 'admin' && password === 'password') {
      navigate('/grades');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Student Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Student ID: </label>
          <p/>
          <input
            value={studentID}
            onChange={(e) => setstudentID(e.target.value)}
          />
        </div>
        <p/>
        <div>
          <label>Password: </label>
          <p/>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p/>
        <button className={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default Login;
