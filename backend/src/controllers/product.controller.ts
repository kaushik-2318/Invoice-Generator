import { Request, Response } from "express";
import Invoice from "../models/invoice.model";

export const addProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?._id;

    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      res.status(400).json({ message: "No products added" });
      return;
    }
    const validProducts = products.filter(
      (product: any) =>
        product && product.name && product.price && product.quantity
    );

    if (validProducts.length === 0) {
      res.status(400).json({ message: "No valid products found" });
      return;
    }

    if (!userId) {
      res.status(400).json({ message: "User ID not found" });
      return;
    }

    const mappedProducts = products.map((product: any) => ({
      productname: product.name,
      productquantity: product.quantity,
      productrate: product.price,
    }));

    const amount = parseFloat(
      mappedProducts
        .reduce(
          (total: number, product: any) =>
            total + product.productrate * product.productquantity,
          0
        )
        .toFixed(2)
    );
    const gst = parseFloat((amount * 0.18).toFixed(2));
    const totalamount = parseFloat((amount + gst).toFixed(2));

    const newInvoice = new Invoice({
      userId,
      products: mappedProducts,
      amount,
      gst,
      totalamount,
    });

    await newInvoice.save();
    res
      .status(201)
      .json({
        message: "Invoice created successfully",
        invoiceId: newInvoice._id,
      });
  } catch (error) {
    console.error("Error adding products:", error);
    res.status(500).json({ message: "Error adding products", error });
  }
};
