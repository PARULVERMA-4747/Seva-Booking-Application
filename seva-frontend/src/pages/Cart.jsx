import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { removeFromCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
`;

const Card = styled.div`
  background: #f9f9f9;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Button = styled.button`
  padding: 8px 12px;
  margin-right: 10px;
  background: #333;
  color: white;
  border: none;
  cursor: pointer;
`;

function Cart() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Container>
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        items.map((item) => (
          <Card key={item.code}>
            <h4>{item.title}</h4>
            <p>₹{item.discountedPrice}</p>
            <Button onClick={() => dispatch(removeFromCart(item.code))}>
              Remove
            </Button>
          </Card>
        ))
      )}
      {items.length > 0 && (
        <Button onClick={() => navigate("/checkout")}>
          Proceed to Checkout
        </Button>
      )}
    </Container>
  );
}

export default Cart;
