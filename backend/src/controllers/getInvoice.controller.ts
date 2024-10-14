import { Request, Response } from 'express';
import Invoice from '../models/invoice.model';

export const getInvoice = async (req: Request, res: Response): Promise<void> => {

    try {

  

    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ message: 'Error generating PDF', error });
    }
};
