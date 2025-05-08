import { Request, Response } from 'express';
import { createOrder, getOrderById } from '../services/order.service';

export const createOrderController = async (req: Request, res: Response): Promise<void> => {
  const { items, address, userId } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400).json({ success: false, message: 'Items are required' });
    return;
  }

  if (!address || !address.verified) {
    res.status(400).json({ success: false, message: 'Valid address is required' });
    return;
  }

  if (!userId || typeof userId !== 'number') {
    res.status(400).json({ success: false, message: 'User ID is required' });
    return;
  }

  const order = await createOrder(items, address, userId);
  res.status(201).json({ success: true, data: order });
};

export const getOrderByIdController = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ success: false, message: 'Invalid order ID' });
    return;
  }

  const order = await getOrderById(id);

  if (!order) {
    res.status(404).json({ success: false, message: 'Order not found' });
    return;
  }

  res.json({ success: true, order });
};
