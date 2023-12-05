import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);
    /** Dòng mã const { currentUser } = useSelector((state) => state.user);
     * sử dụng useSelector để lấy thông tin người dùng từ Redux store và gán giá trị
     * vào biến currentUser. state.user là một reducer trong Redux store,
     * và currentUser là một thuộc tính của reducer đó.
     */

    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);

    return (
        <header className="bg-slate-200 shadow-md">
            <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
                <Link to="/">
                    <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                        <span className="text-slate-500">ThaiNguyen</span>
                        <span className="text-slate-700">Home</span>
                    </h1>
                </Link>

                <form onSubmit={handleSubmit} className="bg-slate-100 p-3 rounded-lg flex items-center">
                    <input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="bg-transparent focus:outline-none w-24 sm:w-64"
                        value={searchTerm}
                    />
                    <button>
                        <FaSearch className="text-slate-600" />
                    </button>
                </form>

                <ul className="flex gap-4">
                    <Link to="/">
                        <li className="hidden sm:inline text-slate-700 hover:underline">Trang chủ</li>
                    </Link>
                    <Link to="/about">
                        <li className="hidden sm:inline text-slate-700 hover:underline">Giới thiệu</li>
                    </Link>
                    <Link to="/profile">
                        {currentUser ? (
                            <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="profile" />
                        ) : (
                            <li className="hidden sm:inline text-slate-700 hover:underline">Đăng nhập</li>
                        )}
                    </Link>
                </ul>
            </div>
        </header>
    );
}
