import Listing from '../models/listing.model.js';
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

export const getTotalPostCount = async (req, res, next) => {
    // try {
    //     const result = await ListingModel.aggregate([
    //         {
    //             $group: {
    //                 _id: '$userRef',
    //                 totalPosts: { $sum: 1 },
    //             },
    //         },
    //     ]);
    //     console.log(result);
    //     res.status(200).json(users);
    // } catch (error) {
    //     // Xử lý lỗi nếu có
    //     next(error);
    // }

    // try {
    //     // Truy vấn aggregate để lấy tổng số bài đăng của từng người dùng
    //     const postCounts = await Listing.aggregate([
    //         {
    //             $group: {
    //                 _id: '$userRef',
    //                 totalPosts: { $sum: 1 },
    //             },
    //         },
    //     ]);

    //     // Lấy danh sách tất cả người dùng
    //     const users = await User.find();

    //     // Kết hợp kết quả với danh sách người dùng
    //     const usersWithPostCount = users.map((user) => {
    //         const postCount = postCounts.find((count) => count._id === user._id.toString());
    //         return {
    //             ...user._doc,
    //             totalPosts: postCount ? postCount.totalPosts : 0,
    //         };
    //     });

    //     res.status(200).json(usersWithPostCount);
    // } catch (error) {
    //     next(error);
    // }

    try {
        const postCounts = await Listing.aggregate([
            {
                $group: {
                    _id: '$userRef',
                    totalPosts: { $sum: 1 },
                },
            },
        ]);

        // Lấy danh sách tất cả người dùng
        const users = await User.find();

        // Kết hợp kết quả với danh sách người dùng
        const usersWithPostCount = users.map((user) => {
            const postCount = postCounts.find((count) => count._id.toString() === user._id.toString());
            return {
                ...user._doc,
                totalPosts: postCount ? postCount.totalPosts : 0,
            };
        });

        res.status(200).json(usersWithPostCount);
    } catch (error) {
        next(error);
    }
};
