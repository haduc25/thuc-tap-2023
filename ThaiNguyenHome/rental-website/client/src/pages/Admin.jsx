import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// ICONS
import AdminDashboard from '../components/Admin/AdminDashboard';
import AdminListing from '../components/Admin/AdminListing';
import AdminUserList from '../components/Admin/AdminUserList';
import { useSelector } from 'react-redux';

const Admin = () => {
    const navigate = useNavigate();

    const [danhSachUsers, setdanhSachUsers] = useState([]);
    const [danhSachListing, setDanhSachListing] = useState([]);
    const [showAccessDenied, setShowAccessDenied] = useState(false);
    const [secondsRemaining, setSecondsRemaining] = useState(5);

    const { currentUser } = useSelector((state) => state.user);
    console.log('first');

    useEffect(() => {
        // Kiểm tra quyền truy cập và hiển thị thông báo nếu không phải admin
        if (currentUser.role !== 'admin') {
            setShowAccessDenied(true);

            // Sử dụng setInterval để cập nhật thời gian còn lại mỗi giây
            const intervalId = setInterval(() => {
                setSecondsRemaining((prevSeconds) => prevSeconds - 1);
            }, 1000);

            // Sử dụng setTimeout để chuyển hướng sau 5 giây
            const timeoutId = setTimeout(() => {
                navigate('/');
            }, 5000);

            // Clear interval và timeout khi component unmount để tránh memory leak
            return () => {
                clearInterval(intervalId);
                clearTimeout(timeoutId);
            };
        }
    }, [currentUser.role, navigate]);

    useEffect(() => {
        // Nếu là admin, thực hiện fetch dữ liệu
        const fetchData = async () => {
            try {
                const [usersResponse, listingResponse] = await Promise.all([
                    fetch(`/api/admin/getAllUsers`),
                    fetch('api/admin/getTotalPostCount'),
                ]);

                const usersData = await usersResponse.json();
                const listingData = await listingResponse.json();

                setdanhSachUsers(usersData);
                setDanhSachListing(listingData);

                console.log('Data fetched');
            } catch (error) {
                console.log('Error fetching data: ', error);
            }
        };

        // Kiểm tra nếu là admin mới fetch dữ liệu
        if (currentUser.role === 'admin') {
            fetchData();
        }
    }, [currentUser.role]);

    const handleEdit = (userId) => {
        alert(`Edit user with ID ${userId}`);
    };

    const handleDelete = (userId) => {
        alert(`Delete user with ID ${userId}`);
    };

    const [currentTab, setCurrentTab] = useState('dashboard');

    const tabs = [
        { key: 'dashboard', label: 'Trang tổng quan' },
        { key: 'users', label: 'Danh sách người dùng' },
        { key: 'rooms', label: 'Danh sách phòng' },
    ];

    return (
        <div>
            {showAccessDenied ? (
                <div className="flex items-center justify-center min-h-[83vh]">
                    <div className="text-center">
                        {/* Hình ảnh "Access Denied" */}
                        <img
                            src="./src/assets/img/vecteezy_folder-security-no-bg.png"
                            alt="Access Denied"
                            style={{ maxWidth: '300px' }}
                            draggable="false"
                            className="mx-auto"
                        />
                        <p className="text-2xl mt-2 font-semibold">Bạn không có quyền truy cập trang này</p>
                        <p className="text-lg">
                            Tự động chuyển hướng sau <span className="text-red-500 font-bold">{secondsRemaining}</span>{' '}
                            giây
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="mt-4 py-3 px-6 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                        >
                            Quay lại trang chủ
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="flex">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setCurrentTab(tab.key)}
                                className={`px-4 py-2 mx-2 font-bold ${
                                    currentTab === tab.key ? 'bg-gray-100' : 'bg-gray-300 opacity-20'
                                } rounded-md`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Render nội dung dựa trên currentTab */}
                    {currentTab === 'dashboard' ? (
                        <AdminDashboard
                            users={danhSachUsers}
                            listings={danhSachListing}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    ) : currentTab === 'users' ? (
                        <AdminUserList
                            users={danhSachUsers}
                            listings={danhSachListing}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    ) : currentTab === 'rooms' ? (
                        <AdminListing users={danhSachUsers} listings={danhSachListing} />
                    ) : (
                        <p>Component của tab này chưa được định nghĩa.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Admin;
