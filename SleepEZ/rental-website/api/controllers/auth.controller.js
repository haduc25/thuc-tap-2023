import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

export const signup = async(req, res) => {
    const  { username, email, password } = req.body;
    
    // mã hóa password
    const hashedPassword = bcryptjs.hashSync(password, 10)

    // Sử dụng User Model
    const newUser = new User({ username, email, password: hashedPassword })

    // Kt trạng thái
    try {
        await newUser.save()
        res.status(201).json('Đã tạo user thành công!!!')
    } catch (error) {
        res.status(500).json(error.message)
    }

   
}