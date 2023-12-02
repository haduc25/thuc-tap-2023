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

        // Xóa mật khẩu người dùng ở api (tránh bị leak)
        /**
         * password: pass: vì bên trên đã có `password` nên đổi tên thành `pass`
         *
         * before: res.cookie('access_token', token, { httpOnly: true }).status(200).json(validUser);
         * after: res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
         * => và ở json thay vì trả về cả `password` thì trả về phần k có `password` là `rest`
         */
        const { password: pass, ...rest } = validUser._doc;

        // Tạo cookie (lưu `token` trong `cookie`)
        /** res.cookie('access_token', token, { httpOnly: true });
         * httpOnly: true => các ứng dụng bên thứ 3 không thể được truy cập hoặc thay đổi
         * expires: hạn sử dụng `cookie` || nếu k có thì là k có thời gian tồn tại
         */

        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        // check `user` tồn tại hay k? - sử dụng cookie
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

            // lưu lại mảng
            const { password: pass, ...rest } = user._doc;

            // check vs token & cookie
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
        } else {
            // tạo password
            /*** Math.random().toString(36)
             *  `toString(36)` là vùng từ `A-Z` & `0-9` gồm 8 chữ số
             */

            /** .slice(-8)
             * cắt cho chỉ còn 8 chữ số
             *
             * IDEA:
             *  input: Minh Duc
             *  output: minhduc25092001iubeslam
             */

            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            // const newUser = new User({ username: req.body.name, email: req.body.email, password: hashedPassword });

            // dùng phuonwng pháp chia tên xóa khoảng trắng
            const newUser = new User({
                username: req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo,
            });

            // lưu user
            await newUser.save();

            // tạo message (thông báo sign-in thành công)
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            // handle password
            const { password: pass, ...rest } = newUser._doc;
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
        }
    } catch (error) {}
};
