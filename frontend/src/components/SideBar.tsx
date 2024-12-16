import { Link, useLocation, useNavigate } from 'react-router-dom'
import close from '/icons/close-fill.svg'
import axios from 'axios';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

function SideBar({ setShowSidebar }: { setShowSidebar: React.Dispatch<React.SetStateAction<boolean>> }) {
    const sidebarRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    useEffect(() => {
        if (sidebarRef.current) {
            gsap.fromTo(sidebarRef.current, { x: '100%' }, { x: '0%', duration: 0.5 });
        }
        if (menuRef.current) {
            gsap.fromTo(menuRef.current.children, { opacity: 0, x: 20 }, { opacity: 1, x: 0, stagger: 0.1, duration: 1 });
        }
    }, []);

    const handleClose = () => {
        if (sidebarRef.current) {
            gsap.to(sidebarRef.current, { x: '100%', duration: 0.5, onComplete: () => setShowSidebar(false) });
        }
    };

    const handleLogout = () => {
        axios.post(`${import.meta.env.VITE_REACT_API_URI}/auth/logou`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
            .then(() => {
                localStorage.removeItem("token");
                navigate("/");
                window.location.reload();
                setShowSidebar(false)
            })
            .catch((error) => {
                if (error.status === 401) {
                    navigate("/signin");
                }
            });
    };

    return (
        <div ref={backgroundRef} className="bg-[#00000081] min-h-screen w-full fixed z-50 border-red-900 flex justify-end items-center font-['Catamaran']">
            <div ref={sidebarRef} className="fixed bg-gray-900 w-[20%] min-h-screen text-lg text-white">
                <div className='absolute top-7 right-5 cursor-pointer hover:bg-slate-600 duration-300 transition-all p-1 rounded-full' onClick={handleClose}>
                    <img src={close} width={30} alt="Close Icon" />
                </div>
                <div className="h-full w-full px-10 py-10">
                    <div className="text-3xl font-bold pb-5 leading-5 tracking-wider">Menu</div>
                    <hr />
                    <div ref={menuRef} className="mt-5">
                        <div className="flex flex-col gap-5">
                            <Link onClick={handleClose} to={path === '/addproduct' ? '/history' : '/'} className="hover:bg-slate-600 duration-300 transition-all cursor-pointer p-1 rounded-md pl-3">{path === '/addproduct' ? 'History' : 'Home'}</Link>
                            <Link onClick={handleClose} to="" className="hover:bg-slate-600 duration-300 transition-all cursor-pointer p-1 rounded-md pl-3">Edit Profile</Link>
                            <div onClick={handleLogout} className="text-red-500 hover:bg-slate-600 duration-300 transition-all cursor-pointer p-1 rounded-md pl-3">Logout</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar