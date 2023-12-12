import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getDownloadURL, getStorage, list, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import {
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFailure,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';

export default function Profile() {
    const fileRef = useRef(null);
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [showListingsError, setShowListingsError] = useState(false);
    const [userListings, setUserListings] = useState([]);
    const [dialogConfig, setDialogConfig] = useState({
        isOpen: false,
        title: '',
        message: '',
        onCancel: () => setDialogConfig({ ...dialogConfig, isOpen: false }),
        onConfirm: () => setDialogConfig({ ...dialogConfig, isOpen: false }),
    });
    const dispatch = useDispatch();

    // console.log('file: ', file);
    console.log('filePerc: ', filePerc);
    console.log('formData: ', formData);
    console.log('fileUploadError: ', fileUploadError);

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);

    // upload image to firebase
    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done');
                setFilePerc(Math.round(progress));
            },
            (error) => {
                setFileUploadError(true);
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData({
                        ...formData,
                        avatar: downloadURL,
                    });
                });
            },
        );
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());

            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }

            // success
            dispatch(updateUserSuccess(data));

            setUpdateSuccess(true);
        } catch (error) {
            dispatch(updateUserFailure(error.message));
        }
    };

    const handleDeleteUser = async () => {
        try {
            dispatch(deleteUserStart());

            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            });

            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }

            dispatch(deleteUserSuccess(data));
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    };

    const handleSignOut = async (e) => {
        try {
            dispatch(signOutUserStart());
            const res = await fetch('api/auth/signout');
            const data = await res.json();

            if (data.success === false) {
                dispatch(signOutUserFailure(error.message));
                return;
            }

            dispatch(signOutUserSuccess(data));
        } catch (error) {
            dispatch(signOutUserFailure(error.message));
        }
    };

    const handleShowListings = async () => {
        try {
            setShowListingsError(false);
            const res = await fetch(`api/user/listings/${currentUser._id}`);
            const data = await res.json();

            if (data.success === false) {
                setShowListingsError(true);
                return;
            }

            // lưu listings
            setUserListings(data);
        } catch (error) {
            setShowListingsError(true);
        }
    };

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
            setUserListings((prev) => prev.filter((listing) => listing._id) !== listingId);
        } catch (error) {
            console.log(data.message);
        }
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

    const handleCreate = () => {
        // Xử lý logic khi người dùng xác nhận tạo mới
        console.log('Create confirmed');
    };

    const handleUpdate = () => {
        // Xử lý logic khi người dùng xác nhận cập nhật
        console.log('Update confirmed');
    };

    const handleDelete = () => {
        // Xử lý logic khi người dùng xác nhận xóa
        console.log('Delete confirmed');
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Quản lý tài khoản</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    openDialog('Cập nhật tài khoản', 'Bạn có chắc chắn muốn xác nhận những thay đổi này không?', () =>
                        handleSubmit(e),
                    );
                }}
                className="flex flex-col gap-4"
            >
                {/* onChange={(e) => setFile(e.target.files[0])}: lấy ra file */}
                <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*" />
                <img
                    onClick={() => fileRef.current.click()}
                    src={formData.avatar || currentUser.avatar}
                    alt="profile"
                    className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 hover:brightness-75"
                />
                <p className="text-sm self-center">
                    {fileUploadError ? (
                        <span className="text-red-700">Error Image upload (image must be less than 2 mb)</span>
                    ) : filePerc > 0 && filePerc < 100 ? (
                        <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
                    ) : filePerc === 100 ? (
                        <span className="text-green-700">Image successfully uploaded!</span>
                    ) : (
                        ''
                    )}
                </p>

                <input
                    type="text"
                    placeholder="Thay đổi tên hiển thị của bạn"
                    id="username"
                    defaultValue={currentUser.username}
                    className="border p-3 rounded-lg"
                    onChange={handleChange}
                />
                <input
                    type="email"
                    placeholder="Thay đổi địa chỉ email của bạn"
                    id="email"
                    defaultValue={currentUser.email}
                    className="border p-3 rounded-lg"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Cập nhật số điện thoại của bạn"
                    id="phoneNumber"
                    defaultValue={currentUser.phoneNumber}
                    className="border p-3 rounded-lg"
                    onChange={handleChange}
                />
                <p className="pl-3">Thay đổi mật khẩu</p>
                <input
                    type="password"
                    placeholder="Nhập mật khẩu mới"
                    id="password"
                    className="border p-3 rounded-lg"
                    onChange={handleChange}
                />
                <button
                    disabled={loading}
                    className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
                >
                    {loading ? 'Loading...' : 'Cập nhật tài khoản'}
                </button>

                <Link
                    className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
                    to={'/create-listing'}
                >
                    Tạo danh sách mới
                </Link>
            </form>

            <div className="flex justify-between mt-5">
                <span
                    onClick={() =>
                        openDialog(
                            'Xóa tài khoản vĩnh viễn',
                            'Bạn có chắc chắn muốn xóa tài khoản không?',
                            handleDeleteUser,
                        )
                    }
                    className="text-red-700 cursor-pointer"
                >
                    Xóa tài khoản
                </span>
                <span
                    onClick={() =>
                        openDialog(
                            'Đăng xuất tài khoản',
                            'Bạn có chắc bạn muốn đăng xuất tài khoản không?',
                            handleSignOut,
                        )
                    }
                    className="text-red-700 cursor-pointer"
                >
                    Đăng xuất
                </span>
            </div>

            <p className="text-red-700 mt-5">{error ? error : ''}</p>
            <p className="text-green-700 mt-5">{updateSuccess ? 'User is updated successfully' : ''}</p>

            <button onClick={handleShowListings} className="text-green-700 w-full">
                Hiển thị danh sách
            </button>
            <p className="text-red-700 mt-5">{showListingsError ? 'Error showing listings' : ''}</p>
            {userListings && userListings.length > 0 && (
                <div className="flex flex-col gap-4">
                    <h1 className="text-center mt-7 text-2xl font-semibold">
                        Danh sách của bạn ({userListings.length})
                    </h1>
                    {userListings.map((listing) => (
                        <div
                            key={listing._id}
                            className="border rounded-lg p-3 flex justify-between items-center gap-4"
                        >
                            <Link to={`/listing/${listing._id}`}>
                                <img
                                    src={listing.imageUrls[0]}
                                    alt="listing cover"
                                    className="h-16 w-16 object-contain"
                                />
                            </Link>
                            <Link
                                className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                                to={`/listing/${listing._id}`}
                            >
                                <p>{listing.name}</p>
                            </Link>

                            <div className="flex flex-col items-center">
                                <button
                                    onClick={() => handleListingDelete(listing._id)}
                                    className="text-red-700 uppercase"
                                >
                                    Xóa
                                </button>
                                <Link to={`/update-listing/${listing._id}`}>
                                    <button className="text-green-700 uppercase">Chỉnh sửa</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Truyền các props cho ConfirmDialog */}
            <ConfirmDialog {...dialogConfig} />
        </div>
    );
}
