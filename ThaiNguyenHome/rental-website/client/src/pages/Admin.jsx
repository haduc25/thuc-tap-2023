import { useState, useEffect } from 'react';

// ICONS
import { FaSearch, FaUser, FaUserEdit, FaUserPlus, FaUserCog, FaUserTimes } from 'react-icons/fa';

const UserList = ({ users, handleEdit, handleDelete }) => {
    function formatDateTime(input) {
        const date = new Date(input);

        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');

        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0, nên cộng thêm 1
        const year = date.getUTCFullYear();

        const formattedDateTime = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;

        return formattedDateTime;
    }

    return (
        <div className="min-h-[83vh]">
            <div className="flex justify-between mx-6 my-10">
                <div className="px-6 py-3 whitespace-nowrap border bg-blue-500 hover:bg-blue-700 focus:border-blue-300 rounded-md hover:cursor-pointer">
                    <button onClick={() => handleAddUser()} className="flex items-center space-x-1 text-slate-100  ">
                        <FaUserPlus className="text-xl" />
                        <span className="hidden md:inline">Thêm người dùng mới</span>
                    </button>
                </div>
                {/* <input type="text" placeholder="Search..." /> */}
                {/* <form onSubmit={handleSubmit} className="bg-slate-100 p-3 rounded-lg flex items-center"> */}
                <form className="bg-slate-100 p-3 rounded-lg flex items-center border">
                    <input
                        // onChange={(e) => setSearchTerm(e.target.value)}
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="bg-transparent focus:outline-none w-50 sm:w-96"
                        // value={searchTerm}
                    />
                    <button>
                        <FaSearch className="text-slate-600" />
                    </button>
                </form>
            </div>

            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            STT
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Tên người dùng
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Email
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Avatar
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Create At
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Update At
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Role
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Số bài đã đăng
                        </th>
                        <th
                            colSpan={2}
                            scope="col"
                            className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Tùy chọn
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user, index) => (
                        <tr key={user._id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{formatDateTime(user.createdAt)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{formatDateTime(user.updatedAt)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {user.role === 'admin' ? (
                                    <FaUserCog className="text-xl text-blue-500" />
                                ) : user.role === 'user' ? (
                                    <FaUser className="text-base text-blue-500 sma" />
                                ) : (
                                    <span className="text-gray-500">unset</span>
                                )}
                            </td>
                            <td className="px-12 py-4 whitespace-nowrap">{user.postCount || 0}</td>
                            <td className="px-6 py-4 whitespace-nowrap border ">
                                <button
                                    onClick={() => handleEdit(user._id)}
                                    className="flex items-center space-x-1 text-blue-500 hover:text-blue-700  focus:border-blue-300 hover:underline"
                                >
                                    <FaUserEdit className="text-xl" />
                                    <span className="hidden md:inline">Sửa</span>
                                </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap border">
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className="flex items-center space-x-1 text-red-500 hover:text-red-700  focus:border-red-300"
                                >
                                    <FaUserTimes className="text-xl" />
                                    <span className="hidden md:inline">Xoá</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

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
            // try {
            //     const res = await fetch(`api/user/listings/${currentUser._id}`);
            //     const data = await res.json();
            //     setDanhSachListing(data);
            //     console.log('running2');
            // } catch (error) {
            //     console.log('error2: ', error);
            // }
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
                <UserList users={danhSachUsers} handleEdit={handleEdit} handleDelete={handleDelete} />
            ) : (
                <RoomList />
            )}
        </div>
    );
};

export default Admin;
