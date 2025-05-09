import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useState } from 'react';
import { logoutUser } from '../redux/slices/userSlice';
import UserLogin from '../pages/UserLogin';

const NavbarWrapper = styled.nav`
  background: #333;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;

  a {
    color: white;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;


const Slider = styled.div`
  background: #222;
  padding: 15px;
  color: white;
  position: absolute;
  top: 60px;
  right: 20px;
  width: 250px;
  border: 1px solid #444;
  border-radius: 8px;
`;

function Navbar() {
  const { user, isVerified } = useSelector(state => state.user);
  const { latestOrders } = useSelector(state => state.order);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    setOpen(false);
  };

  return (
    <NavbarWrapper>
      <h2>Seva App</h2>
      <NavLinks>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <span style={{ cursor: 'pointer' }} onClick={() => setOpen(!open)}>
          User
        </span>
      </NavLinks>

      {open && (
        <Slider>
          {isVerified && user ? (
            <>
              <p><strong>{user.name}</strong></p>
              <p>{user.email}</p>
              <p>{user.contact}</p>
              <hr />
              <h4>Latest Orders:</h4>
              <ul>
                {latestOrders.slice(0, 3).map((order, index) => (
                  <li key={index}>₹{order.amountToPay}</li>
                ))}
              </ul>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <UserLogin />

          )}
        </Slider>
      )}
    </NavbarWrapper>
  );
}

export default Navbar;
