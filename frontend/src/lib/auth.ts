import { jwtDecode } from 'jwt-decode';

// Define the structure of the decoded token based on what fields it contains
interface DecodedToken {
    exp: number; // Expiration time of the token
}

export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    if (!token) {
        return false; // No token found
    }

    try {
        // Decode the token and ensure it matches the DecodedToken structure
        const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);

        const currentTime = Date.now() / 1000;

        // Check if the token is expired
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
