import express from "express";
const router = express.Router();

import { addProducts } from "../controllers/product.controller";
import { generatePDF } from "../controllers/generateInvoice.controller";
import { getAllInvoice } from "../controllers/getAllInvoice.controller";
import isAuthenticated from "../middleware/auth.middleware";

router.post("/addproducts", isAuthenticated, addProducts);
router.get("/invoice/:invoiceId", generatePDF);
router.get("/history", isAuthenticated, getAllInvoice);

export default router;
