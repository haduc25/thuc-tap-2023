import { useState, useEffect } from 'react';

// ICONS
import { FaSearch, FaUser, FaUserEdit, FaUserPlus, FaUserCog, FaUserTimes } from 'react-icons/fa';
import AdminDashboard from '../components/Admin/AdminDashboard';
import AdminUserList from '../components/Admin/AdminUserList';
import AdminListing from '../components/Admin/AdminListing';

const RoomList = () => {
    return (
        <div className="min-h-[83vh]">
            {/* Nội dung cho tab danh sách phòng */}
            {/* ... */}
        </div>
    );
};

const Admin = () => {
    const [danhSachUsers, setdanhSachUsers] = useState([]);
    const [danhSachListing, setDanhSachListing] = useState([]);

    // users
    useEffect(() => {
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
    }, []);

    // listing
    useEffect(() => {
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
    }, []);

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
        { key: 'dashboard', label: 'Dashboard' },
        { key: 'users', label: 'Danh sách người dùng' },
        { key: 'rooms', label: 'Danh sách phòng' },
        { key: 'notifications', label: 'Thông báo' },
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
                <AdminDashboard />
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
            ) : currentTab === 'notifications' ? (
                <p>NotificationComponent</p>
            ) : (
                <p>Component của tab này chưa được định nghĩa.</p>
            )}
        </div>
    );
};

export default Admin;
