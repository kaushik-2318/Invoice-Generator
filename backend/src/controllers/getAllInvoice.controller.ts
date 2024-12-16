import { Request, Response } from "express";
import Invoice from "../models/invoice.model";

export const getAllInvoice = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;

        const invoices = await Invoice.find({ userId }).select("_id totalamount date");

        const formattedInvoices = invoices.map((invoice) => ({
            invoiceId: invoice._id,
            totalamount: invoice.totalamount,
            date: new Date(invoice.date).toLocaleDateString("en-GB"),
        }));

        res.status(200).json({ invoices: formattedInvoices });

    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ message: "Error in fetching Invoices", error });
    }
};
