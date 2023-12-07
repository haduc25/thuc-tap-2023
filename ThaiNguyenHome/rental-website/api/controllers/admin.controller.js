import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (error) {
        // Xử lý lỗi nếu có
        next(error);
    }
};
