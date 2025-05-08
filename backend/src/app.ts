import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import sevasRoutes from './routes/seva.routes';
import userRoutes from './routes/user.routes';
import addressRoutes from './routes/address.routes';
import orderRoutes from './routes/order.routes';


dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/sevas', sevasRoutes);

app.get('/api/health', (_req, res) => {
  res.send({ status: 'OK' });
});

app.use('/api/users', userRoutes);
app.use('/api/address-by-pincode', addressRoutes);
app.use('/api/order', orderRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
