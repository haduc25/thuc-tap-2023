import { useState, useEffect } from 'react';

// ICONS
import { FaSearch, FaUser, FaUserEdit, FaUserPlus, FaUserCog, FaUserTimes } from 'react-icons/fa';
import AdminUserList from '../components/AdminUserList';

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

    const [currentTab, setCurrentTab] = useState('users'); // Mặc định hiển thị tab người dùng

    return (
        <div>
            <div className="flex">
                {/* {danhSachUsers && danhSachUsers.length > 0 && <p>11</p>} */}
                {danhSachListing.length > 0 ? <p>co dl</p> : <p>k co</p>}
                <button
                    onClick={() => setCurrentTab('users')}
                    className={`px-4 py-2 mx-2 font-bold ${
                        currentTab === 'users' ? 'bg-gray-100' : 'bg-gray-300 opacity-20'
                    } rounded-md`}
                >
                    Danh sách người dùng
                </button>
                <button
                    onClick={() => setCurrentTab('rooms')}
                    className={`px-4 py-2 mx-2 font-bold ${
                        currentTab === 'rooms' ? 'bg-gray-100' : 'bg-gray-300 opacity-20'
                    } rounded-md`}
                >
                    Danh sách phòng
                </button>
                <button
                    onClick={() => setCurrentTab('notifications')}
                    className={`px-4 py-2 mx-2 font-bold ${
                        currentTab === 'notifications' ? 'bg-gray-100' : 'bg-gray-300 opacity-20'
                    } rounded-md`}
                >
                    Thông báo
                </button>
            </div>

            {currentTab === 'users' ? (
                <AdminUserList
                    users={danhSachUsers}
                    listings={danhSachListing}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            ) : (
                <RoomList />
            )}
        </div>
    );
};

export default Admin;
