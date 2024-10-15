import { Request, Response } from "express";
import Invoice from "../models/invoice.model";
import { createPDF } from "../utils/generatePDF";

export const generatePDF = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { invoiceId } = req.params;

    const invoice = await Invoice.findById(invoiceId).populate("userId");

    if (!invoice) {
      res.status(404).json({ message: "Invoice not found" });
      return;
    }

    const mappedProducts = invoice.products.map((product: any) => ({
      name: product.productname,
      quantity: product.productquantity,
      rate: product.productrate,
      amount: product.productquantity * product.productrate,
    }));

    const updatedInvoice = {
      ...invoice.toObject(),
      products: mappedProducts,
    };

    const pdfBuffer = await createPDF(updatedInvoice);

    res.set({
      "Content-Type": "application/pdf",
      // "Content-Disposition": `attachment; filename=invoice-${invoiceId}.pdf`,
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.log("Error generating PDF:", error);
    res.status(500).json({ message: "Error generating PDF", error });
  }
};
