import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
            /** [e.target.id]: e.target.value,
             * Tạo một cặp key-value trong object. Key là e.target.id và value là e.target.value.
             * Điều này giúp cập nhật dữ liệu form với giá trị mới của trường có id tương ứng.
             */
        });
    };

    const validateFormData = () => {
        const { username, email, phoneNumber, password } = formData;

        // Thực hiện các kiểm tra validation tại đây
        if (!username || !email || !phoneNumber || !password) {
            setError('Vui lòng điền đầy đủ thông tin');
            return false;
        }

        // Validation cho email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Email không hợp lệ');
            return false;
        }

        // Validation cho số điện thoại (điều chỉnh regex tùy theo định dạng bạn muốn)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phoneNumber)) {
            setError('Số điện thoại không hợp lệ');
            return false;
        }

        // Validation cho mật khẩu (tối thiểu 8 ký tự)
        if (password.length < 8) {
            setError('Mật khẩu phải có ít nhất 8 ký tự');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateFormData()) {
            return;
        }

        try {
            setLoading(true);
            const res = await fetch('api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (data.success === false) {
                setLoading(false);
                setError(data.message);
                return;
            }

            setLoading(false);
            setError(null);

            navigate('/sign-in');
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    console.log(formData);

    return (
        <div className="p-3 max-w-lg mx-auto min-h-[83vh]">
            <h1 className="text-3xl text-center font-semibold my-7">Đăng ký</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Tên hiển thị của bạn"
                    className="border p-3 rounded-lg"
                    id="username"
                    onChange={handleChange}
                />
                <input
                    type="email"
                    placeholder="Email của bạn (ví dụ: example@example.com)"
                    className="border p-3 rounded-lg"
                    id="email"
                    onChange={handleChange}
                />
                <input
                    type="tel"
                    placeholder="Số điện thoại của bạn"
                    className="border p-3 rounded-lg"
                    id="phoneNumber"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Mật khẩu (tối thiểu 8 ký tự)"
                    className="border p-3 rounded-lg"
                    id="password"
                    onChange={handleChange}
                />
                <button
                    disabled={loading}
                    className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                >
                    {loading ? 'Loading...' : 'Đăng ký'}
                </button>
                <OAuth />
            </form>
            <div className="flex gap-2 mt-5">
                <p>Bạn đã có tài khoản?</p>
                <Link to="/sign-in">
                    <span className="text-blue-700">Đăng nhập ngay</span>
                </Link>
            </div>
            {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
    );
}
