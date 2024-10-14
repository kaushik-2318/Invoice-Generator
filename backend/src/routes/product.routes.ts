import express from "express";
const router = express.Router();

import { addProducts } from "../controllers/product.controller";
import { generatePDF } from "../controllers/generateInvoice.controller";
import isAuthenticated from '../middleware/auth.middleware';

router.post('/addproducts', isAuthenticated, addProducts);
router.get('/invoices/:invoiceId', isAuthenticated, generatePDF);


export default router;