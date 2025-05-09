// src/pages/Checkout.jsx
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useState } from 'react';
import api from '../services/api';

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
`;

const Left = styled.div`
  flex: 1;
  border-right: 1px solid #ccc;
`;

const Right = styled.div`
  flex: 1;
`;

const Card = styled.div`
  background: #f1f1f1;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 6px;
`;

const Input = styled.input`
  display: block;
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
`;

const Button = styled.button`
  background: #333;
  color: white;
  padding: 10px 20px;
  border: none;
  margin-top: 10px;
  cursor: pointer;
`;

function Checkout() {
  const { items } = useSelector(state => state.cart);
  const { user, isVerified } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [address, setAddress] = useState({
    name: '',
    type: 1,
    addrLine1: '',
    addrLine2: '',
    pincode: '',
    city: '',
    state: '',
    verified: false,
  });

  const [userForm, setUserForm] = useState({
    name: '',
    contact: '',
    email: '',
  });

  const [pinLoading, setPinLoading] = useState(false);

  const handlePincode = async (e) => {
    const pin = e.target.value;
    setAddress(prev => ({ ...prev, pincode: pin }));
    if (pin.length === 6) {
      setPinLoading(true);
      try {
        const res = await api.get(`api/address-by-pincode/${pin}`);
        setAddress(prev => ({
          ...prev,
          city: res.data.data.city,
          state: res.data.data.state,
          verified: true
        }));
      } catch (err) {
        alert('Invalid pincode');
      } finally {
        setPinLoading(false);
      }
    }
  };

  const handleOrder = async () => {
    if (!user || !address.verified) return;
    try {
      const res = await api.post('/api/order', {
        userId: user.id,
        items,
        address,
      });
      alert(`Order Placed. Payment ID: ${res.data.data.paymentId}`);
    } catch (err) {
      alert('Order failed');
    }
  };

  return (
    <Wrapper>
      <Left>
        <h3>Selected Items</h3>
        {items.map(item => (
          <Card key={item.code}>
            <p>{item.title}</p>
            <p>₹{item.discountedPrice}</p>
          </Card>
        ))}
      </Left>
      <Right>
        <h3>User Details</h3>
        {!isVerified ? (
          <p>Please login using mobile flow (coming next).</p>
        ) : (
          <>
            <Input
              placeholder="Name"
              value={userForm.name}
              onChange={e => setUserForm({ ...userForm, name: e.target.value })}
            />
            <Input
              placeholder="Email"
              value={userForm.email}
              onChange={e => setUserForm({ ...userForm, email: e.target.value })}
            />
            <Input
              placeholder="Contact"
              value={userForm.contact}
              onChange={e => setUserForm({ ...userForm, contact: e.target.value })}
            />

            <h4>Address</h4>
            <Input
              placeholder="Pincode"
              value={address.pincode}
              onChange={handlePincode}
            />
            {pinLoading && <p>Validating pincode...</p>}
            <Input
              placeholder="City"
              value={address.city}
              readOnly
            />
            <Input
              placeholder="State"
              value={address.state}
              readOnly
            />
            <Input
              placeholder="Address Line 1"
              value={address.addrLine1}
              onChange={e => setAddress({ ...address, addrLine1: e.target.value })}
            />
            <Input
              placeholder="Address Line 2"
              value={address.addrLine2}
              onChange={e => setAddress({ ...address, addrLine2: e.target.value })}
            />
            <Button disabled={!address.verified || !user} onClick={handleOrder}>Pay Now</Button>
          </>
        )}
      </Right>
    </Wrapper>
  );
}

export default Checkout;