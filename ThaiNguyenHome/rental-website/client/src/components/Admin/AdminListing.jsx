// ICONS
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaPlusCircle, FaSearch, FaTimesCircle, FaUser, FaUserCog } from 'react-icons/fa';

import ConfirmDialog from '../../components/ConfirmDialog';

export default function AdminListing({ users, listings }) {
    const navigate = useNavigate();
    const [danhSachListing, setDanhSachListing] = useState([]);
    const [dialogConfig, setDialogConfig] = useState({
        isOpen: false,
        title: '',
        message: '',
        onCancel: () => setDialogConfig({ ...dialogConfig, isOpen: false }),
        onConfirm: () => setDialogConfig({ ...dialogConfig, isOpen: false }),
    });

    // listing with user
    useEffect(() => {
        const fetchListing = async () => {
            try {
                const res = await fetch('api/admin/getAllListings');
                const data = await res.json();

                // Kiểm tra nếu data không phải là mảng, setDanhSachListing sẽ không được gọi
                if (Array.isArray(data)) {
                    setDanhSachListing(data);
                    console.log('running2');
                } else {
                    console.error('Data is not an array:', data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchListing();
    }, []);

    const handleListingDelete = async (listingId) => {
        try {
            const res = await fetch(`/api/listing/delete/${listingId}`, {
                method: 'DELETE',
            });

            const data = await res.json();

            if (data.success === false) {
                console.log(data.message);
                return;
            }

            // lọc trong `userListings`
            setDanhSachListing((prev) => prev.filter((listing) => listing._id !== listingId));
        } catch (error) {
            console.log(data.message);
        }
    };

    function formatDateTime(input) {
        const date = new Date(input);
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        };
        return date.toLocaleString('vi-VN', options);
    }

    const roleIcons = {
        admin: <FaUserCog className="text-xl text-blue-500" />,
        user: <FaUser className="text-base text-blue-500 sma" />,
        unset: <span className="text-gray-500">unset</span>,
    };

    // confirm
    const openDialog = (title, message, onConfirm) => {
        setDialogConfig({
            isOpen: true,
            title,
            message,
            onCancel: () => setDialogConfig({ ...dialogConfig, isOpen: false }),
            onConfirm: () => {
                onConfirm && onConfirm();
                setDialogConfig({ ...dialogConfig, isOpen: false });
            },
        });
    };

    return (
        <div className="min-h-[83vh]">
            <div className="flex justify-between mx-6 my-10">
                <div className="px-6 py-3 whitespace-nowrap border bg-blue-500 hover:bg-blue-700 focus:border-blue-300 rounded-md hover:cursor-pointer">
                    <Link to={'/create-listing'} className="flex items-center space-x-1 text-slate-100  ">
                        <FaPlusCircle className="text-xl" />
                        <span className="hidden md:inline">Thêm danh sách phòng mới</span>
                    </Link>
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
                            Tên phòng
                        </th>
                        <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Ảnh bìa
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
                            Người đăng
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
                    {danhSachListing.map((listing, index) => {
                        const userId = listing._id;
                        // const userListing = listings.find((listing) => listing._id === userId);
                        return (
                            <tr key={listing._id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap max-w-[350px] truncate truncate-overflow">
                                    {listing.name}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img
                                        src={listing.imageUrls[0]}
                                        alt="preview image"
                                        className="min-w-32 h-w-32 rounded-md"
                                    />
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">{formatDateTime(listing.createdAt)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{formatDateTime(listing.updatedAt)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {/* {roleIcons[listing.role] || roleIcons.unset} */}
                                    {listing.username}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap border">
                                    <button
                                        onClick={() =>
                                            openDialog(
                                                'Xác nhận sửa bài đăng',
                                                'Bạn có chắc chắn muốn sửa bài đăng này với quyền quản trị viên hay không?',
                                                () => {
                                                    // Thực hiện chuyển hướng sau khi xác nhận
                                                    navigate(`/update-listing/${listing._id}`);
                                                },
                                            )
                                        }
                                        className="flex items-center space-x-1 text-blue-500 hover:text-blue-700  focus:border-blue-300 hover:underline"
                                    >
                                        <FaEdit className="text-xl" />
                                        <span className="hidden md:inline">Sửa</span>
                                    </button>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap border">
                                    <button
                                        onClick={() =>
                                            openDialog(
                                                'Xóa bài đăng vĩnh viễn',
                                                'Bạn có chắc chắn muốn xóa bài đăng này với quyền quản trị viên hay không?',
                                                () => handleListingDelete(listing._id),
                                            )
                                        }
                                        className="flex items-center space-x-1 text-red-500 hover:text-red-700 focus:border-red-300"
                                    >
                                        <FaTimesCircle className="text-xl" />
                                        <span className="hidden md:inline">Xóa</span>
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <ConfirmDialog {...dialogConfig} />
        </div>
    );
}
