import express from 'express';
import { getAddressByPincode } from '../controllers/address.controller';

const router = express.Router();

router.get('/:pincode', getAddressByPincode);

export default router;
