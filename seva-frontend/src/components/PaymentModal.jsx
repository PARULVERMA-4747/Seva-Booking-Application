import { useState } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
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
  padding: 10px;
  border: none;
  width: 100%;
`;

function PaymentModal({ onClose }) {
  const [method, setMethod] = useState('card');
  const [form, setForm] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    upi: '',
  });

  const validateCard = () => {
    return form.cardNumber.length === 16 && /\d{2}\/\d{2}/.test(form.expiry) && form.cvv.length === 3;
  };

  const validateUpi = () => {
    return /^[\w.-]+@[\w]+$/.test(form.upi);
  };

  const handlePay = () => {
    if (method === 'card' && !validateCard()) return alert('Invalid card details');
    if (method === 'upi' && !validateUpi()) return alert('Invalid UPI');
    alert('Payment successful');
    onClose();
  };

  return (
    <Overlay>
      <Modal>
        <h3>Choose Payment Method</h3>
        <div>
          <label>
            <input type="radio" value="card" checked={method === 'card'} onChange={() => setMethod('card')} /> Card
          </label>
          <label style={{ marginLeft: '20px' }}>
            <input type="radio" value="upi" checked={method === 'upi'} onChange={() => setMethod('upi')} /> UPI
          </label>
        </div>

        {method === 'card' ? (
          <>
            <Input placeholder="Card Number" value={form.cardNumber} onChange={e => setForm({ ...form, cardNumber: e.target.value })} />
            <Input placeholder="Expiry (MM/YY)" value={form.expiry} onChange={e => setForm({ ...form, expiry: e.target.value })} />
            <Input placeholder="CVV" value={form.cvv} onChange={e => setForm({ ...form, cvv: e.target.value })} />
          </>
        ) : (
          <Input placeholder="UPI ID" value={form.upi} onChange={e => setForm({ ...form, upi: e.target.value })} />
        )}

        <Button onClick={handlePay}>Pay</Button>
        <Button style={{ marginTop: '10px', background: '#aaa' }} onClick={onClose}>Cancel</Button>
      </Modal>
    </Overlay>
  );
}

export default PaymentModal;
