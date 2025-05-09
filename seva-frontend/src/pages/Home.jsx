import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import api from "../services/api";
import { addToCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
  background: #f9f9f9;
`;

const Button = styled.button`
  margin-top: 10px;
  background: #333;
  color: white;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
`;

const FloatingCartButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #28a745;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 50px;
  font-weight: bold;
  cursor: pointer;
  z-index: 1000;
`;

function Home() {
  const [sevas, setSevas] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const navigate = useNavigate();

const fetchSevas = async () => {
  try {
    const res = await api.get(`api/sevas?page=${page}&limit=10`);
    const newSevas = res.data.sevas;
    if (newSevas.length < 10) setHasMore(false);
    setSevas((prev) => [...prev, ...newSevas]);
  } catch (err) {
    console.error("Error fetching sevas", err);
  }
};


  useEffect(() => {
    fetchSevas();
  }, [page]);

  return (
    <Container>
      <h2>Available Sevas</h2>
      <Grid>
        {sevas.length === 0 ? (
          <p>No sevas available.</p>
        ) : (
          sevas.map((seva) => (
            <Card key={seva.code}>
              <h4>{seva.title}</h4>
              <p>{seva.description}</p>
              <p>
                Price: ₹<del>{seva.marketPrice}</del>{" "}
                <strong>{seva.discountedPrice}</strong>
              </p>
              <Button onClick={() => dispatch(addToCart(seva))}>
                Add to Cart
              </Button>
            </Card>
          ))
        )}
      </Grid>
      {hasMore && (
        <Button onClick={() => setPage((prev) => prev + 1)}>View More</Button>
      )}

      {cartItems.length > 0 && (
        <FloatingCartButton onClick={() => navigate('/cart')}>
          Go to Cart ({cartItems.length})
        </FloatingCartButton>
      )}
    </Container>
  );
}

export default Home;
