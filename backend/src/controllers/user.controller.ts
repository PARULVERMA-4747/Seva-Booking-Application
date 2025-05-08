import { Request, Response } from 'express';
import { checkUserExists, createUser, getUserById } from '../services/user.service';

export const checkIdentity = async (req: Request, res: Response): Promise<void> => {
  const contact = req.query.contact as string;

  if (!/^[6-9]\d{9}$/.test(contact)) {
    res.status(400).json({ success: false, message: 'Invalid mobile number' });
    return;
  }

  const userId = await checkUserExists(contact);
  res.json({ exists: !!userId, userId });
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, contact } = req.body;
  const user = await createUser(name, email, contact);
  res.status(201).json({ success: true, user });
};

export const fetchUser = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  const user = await getUserById(id);
  if (!user) {
    res.status(404).json({ success: false, message: 'User not found' });
    return;
  }
  res.json({ success: true, user });
};

export const sendOtp = async (req: Request, res: Response): Promise<void> => {
  const { contact } = req.body;
  console.log(`OTP sent to ${contact}: 123456`); // Mock OTP
  res.json({ success: true, message: 'OTP sent' });
};

export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  const { contact, otp } = req.body;

  if (otp === '123456') {
    res.status(200).json({ success: true, message: 'OTP verified' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid OTP' });
  }
};