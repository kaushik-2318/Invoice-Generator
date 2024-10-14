import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { userModel } from '../models/user.model'; // This should be the Mongoose model
import blacklistModel from '../models/blacklist.model';

// Define a custom type for the decoded JWT payload
interface JwtPayload {
    _id: string;
}

const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).send({ message: 'Unauthorized' });
            return; // Ensure that we stop execution here
        }

        const token = authHeader.split(' ')[1];

        // Verify the token and extract the payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as JwtPayload;

        // Find the user by _id
        const user = await userModel.findById(decoded._id).exec();

        if (!user) {
            res.status(401).json({ message: 'Unauthorized' });
            return; // Stop further execution
        }

        // Check if the token is blacklisted
        const isTokenBlacklisted = await blacklistModel.findOne({ token });

        if (isTokenBlacklisted) {
            res.status(401).json({ message: 'Token is blacklisted' });
            return; // Stop further execution
        }

        // Attach the user (IUser document) to the request object
        req.user = user;

        // Proceed to the next middleware
        next(); // No need to return anything, just call next()
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).send('Not Authorized');
    }
};

export default isAuthenticated;
