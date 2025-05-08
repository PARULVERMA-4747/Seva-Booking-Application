import express from 'express';
import { createOrderController, getOrderByIdController } from '../controllers/order.controller';

const router = express.Router();

router.post('/', createOrderController);
router.get('/:id', getOrderByIdController);

export default router;
