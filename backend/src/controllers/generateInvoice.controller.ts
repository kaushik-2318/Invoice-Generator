import { Request, Response } from "express";
import Invoice from "../models/invoice.model";
import { createPDF } from "../utils/generatePDF";

export const generatePDF = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { invoiceId } = req.params;

    console.log("check1")

    const invoice = await Invoice.findById(invoiceId).populate("userId");

    console.log("check2")


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

    console.log("check3")

    const updatedInvoice = {
      ...invoice.toObject(),
      products: mappedProducts,
    };

    console.log("check4")

    const pdfBuffer = await createPDF(updatedInvoice);

    console.log("check5")

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
