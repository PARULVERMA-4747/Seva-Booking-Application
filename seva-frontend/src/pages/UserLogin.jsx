// src/components/UserLogin.jsx
import { useDispatch } from 'react-redux';
import { setOtpSent, setIsVerified, setUser } from '../redux/slices/userSlice';
import { useState } from 'react';
import api from '../services/api';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 20px;
`;

const Input = styled.input`
  display: block;
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #333;
  color: white;
  border: none;
  cursor: pointer;
`;

function UserLogin() {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [contact, setContact] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState(null);

  const validateMobile = (number) => /^[6-9]\d{9}$/.test(number);

  const checkUser = async () => {
    if (!validateMobile(contact)) return alert('Invalid mobile');
    try {
      const res = await api.get(`/api/users/identity-exist?contact=${contact}`);
      if (res.data.exists) {
        setUserId(res.data.userId);
        await api.post('/api/users/otp', { contact });
        setStep(3); // move to OTP input
      } else {
        setStep(2); // ask for name/email
      }
    } catch (err) {
      alert('Error checking user');
    }
  };

  const createUser = async () => {
    if (!name || !email) return alert('Enter name & email');
    try {
      const res = await api.post('/api/users', { name, email, contact });
      setUserId(res.data.user.id);
      await api.post('/api/users/otp', { contact });
      setStep(3);
    } catch (err) {
      alert('Error creating user');
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await api.post('/api/users/otp-verify', { contact, otp });
      if (res.data.success) {
        const userRes = await api.get(`/api/users/${userId}`);
        dispatch(setUser(userRes.data.user));
        dispatch(setIsVerified(true));
        dispatch(setOtpSent(false));
        alert('Logged in!');
      } else {
        alert('Invalid OTP');
      }
    } catch (err) {
      alert('OTP failed');
    }
  };

  return (
    <Wrapper>
      <h3>Login</h3>
      {step === 1 && (
        <>
          <Input placeholder="Mobile" value={contact} onChange={e => setContact(e.target.value)} />
          <Button onClick={checkUser}>Continue</Button>
        </>
      )}
      {step === 2 && (
        <>
          <Input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <Button onClick={createUser}>Register & Send OTP</Button>
        </>
      )}
      {step === 3 && (
        <>
          <Input placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} />
          <Button onClick={verifyOtp}>Verify</Button>
        </>
      )}
    </Wrapper>
  );
}

export default UserLogin;
