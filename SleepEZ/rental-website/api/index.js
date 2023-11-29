import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

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

app.listen(3000, () => {
    console.log('Server is Running on port 3000!');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

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
