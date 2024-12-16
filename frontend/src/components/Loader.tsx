import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Loader: React.FC = () => {

    // const [timeLeft, setTimeLeft] = useState(30);
    const [isLoading, setIsLoading] = useState(true);
    const [serverReady, setServerReady] = useState(false);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_REACT_API_URI}/check`)
            .then((response) => {
                console.log('Server is ready:', response.data);
                setServerReady(true);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error reaching server:', error);
                setIsLoading(false);
            });
    }, []);
    return (
        <div className='flex flex-col justify-center items-center h-screen bg-[#1e1e2d] text-[#ffffff]'>
            {isLoading ? (
                <div className='text-center text-xl'>
                    <h2>Waking up the server...</h2>
                    <div>
                        {/* {`Estimated Time: ${timeLeft}s`} */}
                    </div>
                </div>
            ) : (
                <div className='text-2xl text-[#4CAF50]'>Server is Ready!</div>
            )}
        </div>
    )
}

export default Loader

