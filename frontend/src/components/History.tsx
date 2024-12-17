import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/button";

function History() {

    interface Invoice {
        date: string;
        invoiceId: string;
        totalamount: number;
    }

    const [invoices, setInvoice] = useState<Invoice[]>([]);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_REACT_API_URI}/product/history`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setInvoice(res.data.invoices);
            })
            .catch((error) => {
                console.error("Error fetching invoices:", error);
            });
    }, []);

    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-start">
            <div className='px-5 font-["Exo"] md:w-[70%]'>
                <h1 className='py-10 font-["Exo"] text-3xl font-bold text-white md:text-5xl w-full '>
                    Generated Bills
                </h1>
                <div className="grid grid-cols-4 place-content-center place-items-center gap-10 w-full border-b-[1px]">
                    <div className="mb-2 block text-sm font-medium text-white">
                        Date
                    </div>
                    <div className="mb-2 block text-sm font-medium text-white">
                        Invoice ID
                    </div>
                    <div className="mb-2 block text-sm font-medium text-white">
                        Total Amount
                    </div>
                    <div></div>
                </div>

                {
                    invoices.length === 0 ? (
                        <div className="text-center text-lg text-white py-5">
                            No invoices generated yet.
                        </div>
                    ) : (
                        invoices.map((invoice, index) => {
                            return (
                                <div key={index}>
                                    <div className="grid grid-cols-4 place-content-center place-items-center gap-1 w-full py-4 hover:bg-gray-800 duration-200 rounded-xl">
                                        <div className="mb-2 block text-sm font-medium text-white">
                                            {invoice.date}
                                        </div>
                                        <div className="mb-2 block text-sm font-medium text-white truncate overflow-hidden text-ellipsis w-full max-w-xs">
                                            {invoice.invoiceId}
                                        </div>
                                        <div className="mb-2 block text-sm font-medium text-white">
                                            ₹ {invoice.totalamount}
                                        </div>
                                        <Link to={`${import.meta.env.VITE_REACT_API_URI}/product/invoice/${invoice.invoiceId}`} className="mb-2 block text-sm font-medium text-white">
                                            <Button className="bg-blue-500 px-5 rounded-xl py-3">Download</Button>
                                        </Link>
                                    </div>
                                    <hr className="border-b-[1px] w-full" />
                                </div>
                            );
                        })
                    )
                }
            </div>
        </div>
    )
}

export default History
