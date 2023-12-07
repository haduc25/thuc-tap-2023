import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.router.js';
import adminRouter from './routes/admin.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const mongoURI = process.env.MONGO;

mongoose
    .connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();

// Cho phép json làm đầu vào của server
app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
    console.log('Server is Running on port 3000!');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use('/api/admin', adminRouter);

// add middleware
app.use((err, req, res, next) => {
    // tạo ra biến kt nếu có lỗi hoặc mã lỗi 500
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Lỗi máy chủ nội bộ';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
