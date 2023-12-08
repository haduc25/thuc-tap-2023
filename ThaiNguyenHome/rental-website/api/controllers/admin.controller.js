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

export const getAllListings = async (req, res, next) => {
    // try {
    //     // Sử dụng hàm find để lấy tất cả các listings
    //     const listings = await Listing.find({});

    //     // Nếu không có listings, trả về lỗi 404
    //     if (!listings || listings.length === 0) {
    //         return next(errorHandler(404, 'Listings not found!'));
    //     }

    //     // Trả về danh sách các listings
    //     res.status(200).json(listings);
    // } catch (error) {
    //     next(error);
    // }

    try {
        // Sử dụng hàm find để lấy tất cả các listings
        const listings = await Listing.find({});

        // Nếu không có listings, trả về lỗi 404
        if (!listings || listings.length === 0) {
            return next(errorHandler(404, 'Listings not found!'));
        }

        // Lặp qua từng listing để lấy thông tin người dùng từ userRef
        const populatedListings = await Promise.all(
            listings.map(async (listing) => {
                // Lấy thông tin người dùng từ userRef
                const user = await User.findById(listing.userRef);

                // Nếu không tìm thấy người dùng, có thể xử lý theo ý muốn của bạn
                if (!user) {
                    // Thí dụ: Nếu không tìm thấy người dùng, set username thành 'Unknown'
                    return { ...listing.toObject(), username: 'Unknown' };
                } else {
                    // Gán username từ thông tin người dùng
                    return { ...listing.toObject(), username: user.username };
                }
            }),
        );

        // Trả về danh sách các listings đã được populate với thông tin người dùng
        res.status(200).json(populatedListings);
    } catch (error) {
        next(error);
    }
};
