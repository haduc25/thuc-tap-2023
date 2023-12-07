// api/routes/admin.route.js
import express from 'express';
import {
    // getUsers,
    // getUserListings,
    // getListings,
    // deleteUser,
    // deleteListing,
    getAllUsers,
    getTotalPostCount,
} from '../controllers/admin.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Endpoint để lấy danh sách người dùng
router.get('/getAllUsers', verifyToken, getAllUsers);
router.get('/getTotalPostCount', verifyToken, getTotalPostCount);

// // Endpoint để lấy danh sách listings
// router.get('/listings', verifyToken, getListings);

// // Endpoint để xóa người dùng
// router.delete('/user/:id', verifyToken, deleteUser);

// // Endpoint để xóa listing
// router.delete('/listing/:id', verifyToken, deleteListing);

// // Endpoint để lấy danh sách listings của một người dùng cụ thể
// router.get('/user/:id/listings', verifyToken, getUserListings);

export default router;
