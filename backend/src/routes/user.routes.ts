import express from 'express';
import {
  checkIdentity,
  registerUser,
  fetchUser,
  sendOtp,
  verifyOtp,
} from '../controllers/user.controller';

const router = express.Router();

router.get('/identity-exist', checkIdentity);
router.post('/', registerUser);
router.get('/:id', fetchUser);
router.post('/otp', sendOtp);
router.post('/otp-verify', verifyOtp);

export default router;
