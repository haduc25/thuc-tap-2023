import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
    const [formData, setFormData] = useState({});
    // const [error, setError] = useState(null);
    // const [loading, setLoading] = useState(false);
    const { loading, error } = useSelector((state) => state.user);
    /** const { loading, error } = userSelector((state) => state.user);
     * Biết rằng `state.user` lấy từ `userSlice.js`
     * `userSelector` là một hàm hoặc selector để lấy thông tin người dùng từ trạng thái.
        `loading` và error được tạo ra bằng cách lấy giá trị tương ứng từ kết quả của `userSelector`.
     * Dùng để truy cập trạng thái "đang tải" (loading) và thông báo lỗi (error) từ trạng thái người dùng.
     */
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // setLoading(true);
            dispatch(signInStart());
            const res = await fetch('api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log(data);

            // check xem register thành công hay k?
            if (data.success === false) {
                // nếu có lỗi
                // setLoading(false);
                // setError(data.message);
                dispatch(signInFailure(data.message));
                return;
            }
            // setLoading(false);
            // setError(null);
            dispatch(signInSuccess(data));

            // chuyển hướng về trang chủ
            navigate('/');
        } catch (error) {
            // setLoading(false);
            // setError(error.message);
            dispatch(signInFailure(error.message));
        }
    };

    // console.log(formData);

    return (
        <div className="p-3 max-w-lg mx-auto min-h-[83vh]">
            <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="email"
                    className="border p-3 rounded-lg"
                    id="email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="password"
                    className="border p-3 rounded-lg"
                    id="password"
                    onChange={handleChange}
                />
                <button
                    disabled={loading}
                    className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                >
                    {loading ? 'Loading...' : 'Sign In'}
                </button>
                <OAuth />
            </form>
            <div className="flex gap-2 mt-5">
                <p>Don't Have an account?</p>
                <Link to="/sign-up">
                    <span className="text-blue-700">Sign Up</span>
                </Link>
            </div>
            {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
    );
}
