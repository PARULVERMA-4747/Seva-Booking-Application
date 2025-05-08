import { Request, Response } from 'express';
import { getSevaByCode, getSevas } from '../services/seva.service';

export const getSevasController = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await getSevas(page, limit);

    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch Sevas' });
  }
};

export const getSevaByCodeController = async (req: Request, res: Response) => {
    try {
      const { code } = req.params;
      const seva = await getSevaByCode(code);
      res.status(200).json({ success: true, data: seva });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error instanceof Error ? error.message : 'Something went wrong',
      });
    }
  };
  