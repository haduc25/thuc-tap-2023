import React from 'react';

export default function Admin() {
    const users = [
        {
            _id: '1',
            username: 'john_doe',
            email: 'john.doe@example.com',
            avatar: 'https://th.bing.com/th/id/R.d066dbbaf670ea810082b082cbabf368?rik=dpSBI42TQxQehw&pid=ImgRaw&r=0',
            createdAt: '2023-01-01T12:00:00Z',
            updatedAt: '2023-01-05T15:30:00Z',
            role: 'user',
            postCount: 10,
        },
        {
            _id: '2',
            username: 'john_doe',
            email: 'john.doe@example.com',
            avatar: 'https://th.bing.com/th/id/R.d066dbbaf670ea810082b082cbabf368?rik=dpSBI42TQxQehw&pid=ImgRaw&r=0',
            createdAt: '2023-01-01T12:00:00Z',
            updatedAt: '2023-01-05T15:30:00Z',
            role: 'user',
            postCount: 10,
        },
        {
            _id: '3',
            username: 'john_doe',
            email: 'john.doe@example.com',
            avatar: 'https://th.bing.com/th/id/R.d066dbbaf670ea810082b082cbabf368?rik=dpSBI42TQxQehw&pid=ImgRaw&r=0',
            createdAt: '2023-01-01T12:00:00Z',
            updatedAt: '2023-01-05T15:30:00Z',
            role: 'user',
            postCount: 10,
        },
    ];

    const handleEdit = (userId) => {
        // Xử lý chức năng sửa đổi
        console.log(`Edit user with ID ${userId}`);
    };

    const handleDelete = (userId) => {
        // Xử lý chức năng xóa
        console.log(`Delete user with ID ${userId}`);
    };
    return (
        <div className="min-h-[83vh]">
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
                            <td className="px-6 py-4 whitespace-nowrap">{user.createdAt}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.updatedAt}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                            <td className="px-12 py-4 whitespace-nowrap">{user.postCount}</td>
                            <td className="px-6 py-4 whitespace-nowrap border">
                                <button
                                    onClick={() => handleEdit(user._id)}
                                    className="text-blue-500 hover:underline focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    Sửa
                                </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap border">
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className="text-red-500 hover:underline focus:outline-none focus:ring focus:border-red-300"
                                >
                                    Xoá
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
