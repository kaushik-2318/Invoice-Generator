import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../context/serverContext";
import LoaderAnimation from './LoaderAnimation';

const Loader: React.FC = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [serverReady, setServerReady] = useState(false);
    const [isError, setIsError] = useState("Waking up the server...");
    const { setIsAlive } = useContext(Context);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_REACT_API_URI}/check`)
            .then((response) => {
                console.log('Server is ready:', response.data);
                setServerReady(true);
                setIsLoading(false);
                setIsAlive(true)
                setIsError("Server is ready");
            })
            .catch((err) => {
                setIsError("Error: " + err);
            });
    }, []);
    return (
        <div className='flex flex-col justify-center items-center h-screen bg-[#111827] text-[#ffffff]'>
            {isLoading && !serverReady ? (
                <div className='text-center text-xl'>
                    <LoaderAnimation />
                    <h2>{isError}</h2>
                </div>
            ) : (
                <div className='text-3xl text-[#4CAF50]'>Server is Ready!</div>
            )}
        </div>
    )
}

export default Loader

