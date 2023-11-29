import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    // mã hóa password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Sử dụng User Model
    const newUser = new User({ username, email, password: hashedPassword });

    // Kt trạng thái
    try {
        await newUser.save();
        res.status(201).json('Đã tạo user thành công!!!');
    } catch (error) {
        // next(errorHandler(550, 'error from the function!'));
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // kiểm tra email của user hợp lệ hay k
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found!'));

        // kiểm tra mật khẩu hợp lệ bằng `bcrytjs`
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Wrong credentials')); //Invalid password!

        // Tạo token (sử dụng `id` để nhận dạng)
        // thêm `secret key`
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        // Tạo cookie (lưu `token` trong `cookie`)
        /** res.cookie('access_token', token, { httpOnly: true });
         * httpOnly: true => các ứng dụng bên thứ 3 không thể được truy cập hoặc thay đổi
         * expires: hạn sử dụng `cookie` || nếu k có thì là k có thời gian tồn tại
         */
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(validUser);
    } catch (error) {
        next(error);
    }
};
