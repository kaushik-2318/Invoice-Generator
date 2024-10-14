import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    exp: number;
}

export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }

    try {
        const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);

        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
            localStorage.removeItem('token');
            return false;
        }

        return true;

    } catch (error) {
        console.error('Invalid token:', error);
        return false;
    }
};
