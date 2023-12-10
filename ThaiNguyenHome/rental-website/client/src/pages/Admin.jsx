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

    const { currentUser } = useSelector((state) => state.user);
    console.log('currentUser: ', currentUser.role); //user

    // Kiểm tra nếu không phải là admin thì hiển thị thông báo và quay lại trang chủ
    useEffect(() => {
        if (currentUser.role !== 'admin') {
            alert('Bạn không có quyền truy cập trang này');
            // Thực hiện chuyển hướng đến trang chủ hoặc điều hướng khác
            // Ví dụ: window.location.href = '/';

            // chuyển hướng về trang chủ
            navigate('/');
        } else {
            // Nếu là admin, thực hiện fetch dữ liệu
            const fetchLandlord = async () => {
                try {
                    const res = await fetch(`/api/admin/getAllUsers`);
                    const data = await res.json();
                    setdanhSachUsers(data);
                    console.log('running');
                } catch (error) {
                    console.log('error2: ', error);
                }
            };
            fetchLandlord();

            const fetchListing = async () => {
                try {
                    const res = await fetch('api/admin/getTotalPostCount');
                    const data = await res.json();
                    setDanhSachListing(data);
                    console.log('running2');
                } catch (error) {
                    console.log('error2: ', error);
                }
            };
            fetchListing();
        }
    }, [currentUser.role]);

    // // users
    // useEffect(() => {
    //     const fetchLandlord = async () => {
    //         try {
    //             const res = await fetch(`/api/admin/getAllUsers`);
    //             const data = await res.json();
    //             setdanhSachUsers(data);
    //             console.log('running');
    //         } catch (error) {
    //             console.log('error2: ', error);
    //         }
    //     };
    //     fetchLandlord();
    // }, []);

    // // listing
    // useEffect(() => {
    //     const fetchListing = async () => {
    //         try {
    //             const res = await fetch('api/admin/getTotalPostCount');
    //             const data = await res.json();
    //             setDanhSachListing(data);
    //             console.log('running2');
    //         } catch (error) {
    //             console.log('error2: ', error);
    //         }
    //     };
    //     fetchListing();
    // }, []);

    const handleEdit = (userId) => {
        // Xử lý chức năng sửa đổi
        alert(`Edit user with ID ${userId}`);
    };

    const handleDelete = (userId) => {
        // Xử lý chức năng xóa
        alert(`Delete user with ID ${userId}`);
    };

    const [currentTab, setCurrentTab] = useState('dashboard'); // Mặc định hiển thị tab người dùng

    // Thêm các tab mới vào mảng tabs khi cần
    const tabs = [
        { key: 'dashboard', label: 'Trang tổng quan' },
        { key: 'users', label: 'Danh sách người dùng' },
        { key: 'rooms', label: 'Danh sách Phòng' },
        // Thêm tab mới nếu cần
    ];

    return (
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
                // <RoomList />
                <AdminListing
                    users={danhSachUsers}
                    listings={danhSachListing}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            ) : (
                <p>Component của tab này chưa được định nghĩa.</p>
            )}
        </div>
    );
};

export default Admin;
