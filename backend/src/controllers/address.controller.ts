import { Request, Response } from 'express';
import { lookupPincode } from '../services/address.service';

export const getAddressByPincode = async (req: Request, res: Response): Promise<void> => {
  const { pincode } = req.params;

  if (!/^\d{6}$/.test(pincode)) {
    res.status(400).json({ success: false, message: 'Invalid pincode format' });
    return;
  }

  const result = await lookupPincode(pincode);

  if (!result) {
    res.status(404).json({ success: false, message: 'Pincode not found' });
    return;
  }

  res.json({ success: true, data: result });
};
