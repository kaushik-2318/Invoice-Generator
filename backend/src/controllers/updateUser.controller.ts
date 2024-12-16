import { Request, Response } from 'express';
import { userModel } from '../models/user.model';

const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email } = req.body;
    const userId = req.user?._id;

    try {
        const user = await userModel.findById(userId).select('-password');

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return
        }

        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();

        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error });
    }
};

export { updateUser }