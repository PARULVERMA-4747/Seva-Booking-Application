import express from 'express';
import {
  getSevasController,
  getSevaByCodeController,
} from '../controllers/seva.controller';

const router = express.Router();

router.get('/', getSevasController);
router.get('/:code', getSevaByCodeController);

export default router;
