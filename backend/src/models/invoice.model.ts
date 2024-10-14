import mongoose, { Document, Schema } from 'mongoose';

interface IInvoice extends Document {
    userId: mongoose.Types.ObjectId;
    products: {
        name: string;
        quantity: number;
        rate: number;
    }[];
    totalamount: number;
    amount: number;
    gst: number;
    date: Date;
}

const invoiceSchema = new Schema<IInvoice>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },

    products: [
        {
            productname: { type: String, required: true },
            productquantity: { type: Number, required: true },
            productrate: { type: Number, required: true },
        },
    ],
    amount: { type: Number, required: true },
    totalamount: { type: Number, required: true },
    gst: { type: Number, required: true },
    date: {
        type: Date,
        default: Date.now,
    },
    
});

const Invoice = mongoose.model<IInvoice>('Invoice', invoiceSchema);
export default Invoice;
