// ICONS
import { useState, useEffect } from 'react';
import { FaSearch, FaUser, FaUserCog, FaEdit, FaTimesCircle, FaPlusCircle } from 'react-icons/fa';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Doughnut, Line, Pie, PolarArea, Radar } from 'react-chartjs-2';
import 'chart.js/auto';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdminDashboard({ users, listings, handleEdit, handleDelete }) {
    const [danhSachListing, setDanhSachListing] = useState([]);
    const [saveUserHaveData, setSaveUserHaveData] = useState([]);

    // listing with user
    useEffect(() => {
        const fetchListing = async () => {
            try {
                const res = await fetch('api/admin/getAllListings');
                const data = await res.json();
                setDanhSachListing(data);
                console.log('running2');
            } catch (error) {
                console.log('error2: ', error);
            }
        };
        fetchListing();
    }, []);

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

    // bd3
    // Dữ liệu mẫu cho biểu đồ đường
    const lineData = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
        datasets: [
            {
                label: 'Số lượng đơn đặt phòng',
                data: [12, 19, 3, 5, 2],
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
            },
        ],
    };

    // bd4
    // Dữ liệu mẫu cho biểu đồ radar
    const radarData = {
        labels: ['Khả năng', 'Số lượng', 'Chất lượng', 'Giá trị'],
        datasets: [
            {
                label: 'Đánh giá',
                data: [80, 60, 75, 90],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // bd7
    // Dữ liệu mẫu cho biểu đồ diện cực
    const firstFiveListings = danhSachListing.slice(0, 5);

    // Mảng màu mới
    const backgroundColors = [
        'rgba(75, 192, 192, 0.3)',
        'rgba(255, 99, 132, 0.3)',
        'rgba(255, 205, 86, 0.3)',
        'rgba(54, 162, 235, 0.3)',
        'rgba(153, 102, 255, 0.3)',
    ];

    const borderColors = [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 205, 86, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(153, 102, 255, 1)',
    ];

    const polarAreaChartData = {
        labels: firstFiveListings.map((listing) => truncateText(listing.name, 16)),
        datasets: [
            {
                label: 'Phòng tắm',
                data: firstFiveListings.map((listing) => listing.bathrooms),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
            {
                label: 'Phòng ngủ',
                data: firstFiveListings.map((listing) => listing.bedrooms),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
            {
                label: 'Wifi',
                data: firstFiveListings.map((listing) => (listing.furnished ? 1 : 0)),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
            {
                label: 'Chỗ để xe',
                data: firstFiveListings.map((listing) => (listing.parking ? 1 : 0)),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
            {
                label: 'Type',
                data: firstFiveListings.map((listing) => (listing.type === 'rent' ? 1 : 0)),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };

    // bd8
    // Tính số lượng người dùng mới trong mỗi ngày
    const userCountsByDay = {};
    users.forEach((user) => {
        const createdAt = new Date(user.createdAt).toLocaleDateString();
        userCountsByDay[createdAt] = (userCountsByDay[createdAt] || 0) + 1;
    });

    // Chuyển dữ liệu thành định dạng phù hợp cho biểu đồ
    const chartData = {
        labels: Object.keys(userCountsByDay),
        datasets: [
            {
                label: 'Số người tạo mới',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: true,
                data: Object.values(userCountsByDay),
            },
        ],
    };

    // remake
    // bd have real value
    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    }

    // 1
    // Tạo dữ liệu cho biểu đồ Bar
    const barChartData = {
        labels: danhSachListing.slice(0, 10).map((listing) => truncateText(listing.name, 16)),
        datasets: [
            {
                label: 'Giá bình thường',
                backgroundColor: 'rgba(54, 162, 235, 0.5)', // Màu xanh dương
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                data: danhSachListing.slice(0, 15).map((listing) => listing.regularPrice),
            },
            {
                label: 'Giá giảm giá',
                backgroundColor: 'rgba(255, 99, 132, 0.5)', // Màu đỏ
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                data: danhSachListing.slice(0, 15).map((listing) => listing.discountPrice),
            },
        ],
    };

    // bd2

    const calculateListingPercentage = () => {
        const rentCount = danhSachListing.filter((listing) => listing.type === 'rent').length;
        const saleCount = danhSachListing.length - rentCount;

        const totalListings = danhSachListing.length;
        const rentPercentage = (rentCount / totalListings) * 100;
        const salePercentage = (saleCount / totalListings) * 100;

        return [rentPercentage, salePercentage];
    };

    const createListingData = (data) => ({
        labels: ['Cho thuê', 'Đang bán'],
        datasets: [
            {
                // label: 'Tỷ lệ phần trăm (%) giữa các loại phòng',
                data,
                backgroundColor: ['#36A2EB', '#FF6384'],
                borderColor: ['#36A2EB', '#FF6384'],
                borderWidth: 1,
            },
        ],
    });

    const [listingData, setListingData] = useState(() => createListingData([0, 0]));

    useEffect(() => {
        const timer = setTimeout(() => {
            setListingData(() => {
                const percentages = calculateListingPercentage();
                const newData = createListingData(percentages);
                return newData;
            });
        }, 2000);

        console.log('mâm');
        // Clear the timeout on component unmount
        return () => clearTimeout(timer);
    }, [danhSachListing]);

    // bd4
    // Lọc những user có totalPosts > 0
    // const usersWithPosts = users.filter((user) => user.totalPosts);
    // console.log('usersWithPosts: ', usersWithPosts);

    // const usernamesWithPosts = usersWithPosts.map((user) => user.username);
    // console.log('usernamesWithPosts: ', usernamesWithPosts);

    // test 1
    // const kiki = () => {
    //     users.map((user) => {
    //         const userId = user._id;
    //         const userListing = listings.find((listing) => listing._id === userId);
    //         // return userListing?.totalPosts && `${userListing?.username}`;
    //         const filterOnlyHavePosted = userListing?.totalPosts && `${userListing?.username}`;
    //         console.log('userListing: ', filterOnlyHavePosted);
    //     });
    // };

    const meow = () => {
        users.map((user, index) => {
            // const userId = user._id;
            // const userListing = listings.find((listing) => listing._id === userId);
            // const haveData = userListing?.totalPosts ? userListing?.username : null;
            // return console.log(haveData);
            console.log(
                (listings.find((listing) => listing._id === user._id)?.totalPosts &&
                    listings.find((listing) => listing._id === user._id)?.username) ||
                    null,
            );
        });
    };
    meow();

    return (
        <div className="min-h-[83vh]">
            <div className="flex justify-between mx-6 my-10">
                <div className="px-6 py-3 whitespace-nowrap border bg-blue-500 hover:bg-blue-700 focus:border-blue-300 rounded-md hover:cursor-pointer">
                    <button onClick={() => handleAddUser()} className="flex items-center space-x-1 text-slate-100  ">
                        <FaPlusCircle className="text-xl" />
                        <span className="hidden md:inline">Thêm danh sách phòng mới</span>
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
                                        className="w-32 h-w-32 rounded-md"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{formatDateTime(listing.createdAt)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{formatDateTime(listing.updatedAt)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {/* {roleIcons[listing.role] || roleIcons.unset} */}
                                    {listing.username}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap border ">
                                    <button
                                        onClick={() => handleEdit(listing._id)}
                                        className="flex items-center space-x-1 text-blue-500 hover:text-blue-700  focus:border-blue-300 hover:underline"
                                    >
                                        <FaEdit className="text-xl" />
                                        <span className="hidden md:inline">Sửa</span>
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap border">
                                    <button
                                        onClick={() => handleDelete(listing._id)}
                                        className="flex items-center space-x-1 text-red-500 hover:text-red-700  focus:border-red-300"
                                    >
                                        <FaTimesCircle className="text-xl" />
                                        <span className="hidden md:inline">Xoá</span>
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Phần biểu đồ */}
            <div className="my-2 mx-2 max-w-sm">
                <h2>Biểu đồ polararea tổng quan về tiện ích</h2>
                <PolarArea data={polarAreaChartData} />
            </div>
            {/* Phần biểu đồ */}
            <div className="my-2 mx-2 max-w-lg">
                <h2>Biểu đồ số người tạo mới trong 7 ngày qua</h2>
                <Line data={chartData} />
            </div>

            {/* REAL DATA _ CHART */}
            <div className="my-6">
                <h2>Biểu đồ Giá bình thường và Giảm giá của các listing</h2>
                <Bar data={barChartData} />
            </div>
            <div className="my-6">
                <h2>Biểu đồ Bar - Tỷ lệ phần trăm giữa các loại listing</h2>
                <Bar data={listingData} />
            </div>
        </div>
    );
}
