import React, { useEffect, useState } from 'react';
import axios from 'axios';
import plus from '/icons/add-circle-fill.svg';
import Table from './Table';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface Product {
    name: string;
    price: number;
    quantity: number;
}

const AddProduct: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [productName, setProductName] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const [urlId, setUrlId] = useState<string>('');
    const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);
    const navigate = useNavigate();

    const addProductToList = () => {
        if (!productName.trim()) {
            alert("Product name is required.");
            return;
        }
        if (price <= 0) {
            alert("Product price must be greater than 0.");
            return;
        }
        if (price >= 10000000000) {
            alert("Please enter a valid price.");
            return;
        }

        if (quantity <= 0) {
            alert("Product quantity must be greater than 0.");
            return;
        }

        if (quantity >= 10000000000) {
            alert("Please enter a valid quantity.");
            return;
        }

        const newProduct: Product = {
            name: productName,
            price,
            quantity,
        };

        setProductName(productName.charAt(0).toUpperCase() + productName.slice(1));
        setProducts([...products, newProduct]);
        setProductName('');
        setPrice(0);
        setQuantity(1);
    };

    const handleSubmit = async () => {
        if (products.length === 0) {
            toast.error("Please add at least one product before submitting.");
            return;
        }
        try {
            const token = localStorage.getItem('token');
            await axios.post(`https://pdf-generator-r879.onrender.com/product/addproducts`, { products }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then((res) => {
                    toast.success("Products added successfully!");
                    setUrlId(res.data.invoiceId);
                    setProducts([]);
                })
                .catch((err) => {
                    const errorMessage = err.response?.data?.message || 'Failed to add products';
                    toast.error(errorMessage);
                });
        } catch (error) {
            console.error('Error adding products', error);
            toast.error('An unexpected error occurred.');
        }
    };

    const handleGeneratePDF = async () => {
        if (isGeneratingPDF) return;
        setIsGeneratingPDF(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`https://pdf-generator-r879.onrender.com/product/invoices/${urlId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `invoice-${urlId}.pdf`);
            document.body.appendChild(link);
            link.click();
        } catch (err) {
            console.log(err);
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    const handleLogout = () => {
        axios.post(`https://pdf-generator-r879.onrender.com/auth/logout`, {},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        )
            .then(() => {
                localStorage.removeItem("token");
                navigate("/");
                window.location.reload();
            })
            .catch((error) => {
                if (error.status === 401) {
                    navigate("/signin");
                }
            });
    }

    useEffect(() => {
        if (urlId) {
            handleGeneratePDF();
        }
    }, [urlId]);

    return (
        <div className='flex flex-col justify-start items-center bg-gray-900 text-white min-h-screen'>
            <div onClick={handleLogout} className='absolute right-5 top-2 text-red-500 text-lg cursor-pointer'>
                Logout
            </div>
            <div>
                <h1 className='text-xl font-bold text-white md:text-5xl py-10'>Add Products</h1>

                <div className='flex gap-10'>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">
                            Product Name
                        </label>
                        <input className="bg-gray-700 border border-gray-600 text-white rounded-lg block w-full p-2.5 placeholder-gray-400 outline-none duration-200"
                            type="text" id="name" value={productName}
                            onChange={(e) => setProductName(e.target.value)} placeholder="Product Name" />
                    </div>

                    <div>
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-white">
                            Product Price
                        </label>
                        <input className="bg-gray-700 border border-gray-600 text-white rounded-lg block w-full p-2.5 placeholder-gray-400 outline-none duration-200"
                            type="number" id="price" value={price}
                            onChange={(e) => setPrice(Number(e.target.value))} placeholder="Price" />
                    </div>

                    <div>
                        <label htmlFor="qty" className="block mb-2 text-sm font-medium text-white">
                            Quantity
                        </label>
                        <input className="bg-gray-700 border border-gray-600 text-white rounded-lg block w-full p-2.5 placeholder-gray-400 outline-none duration-200"
                            type="number" id="qty" value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))} placeholder="Quantity" min="1" />
                    </div>

                    <button className='relative top-3' onClick={addProductToList}>
                        <img className='w-10' src={plus} alt="Add Product To List" />
                    </button>
                </div>

                <div className='flex justify-between items-center'>
                    <h3 className='text-xl font-bold text-white md:text-2xl py-10'>Product List</h3>

                    <button type="button"
                        onClick={handleSubmit}
                        className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 outline-none 
                                        ${isGeneratingPDF ? 'disabled:bg-blue-400 disabled:cursor-not-allowed' : ''}`}
                        disabled={isGeneratingPDF}>
                        {isGeneratingPDF ? 'Generating...' : 'Generate PDF Invoice'}
                    </button>
                </div>
                <Table products={products} />
            </div>
        </div>
    );
};

export default AddProduct;
