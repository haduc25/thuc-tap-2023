import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

// ICONS
import { FaBath, FaBed, FaWifi, FaMapMarkedAlt, FaMapMarkerAlt, FaParking, FaShare } from 'react-icons/fa';

// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.
import Contact from '../components/Contact';
import GoogleMap from '../components/GoogleMap';

export default function Listing() {
    SwiperCore.use([Navigation]);
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);
    const [landlordInfo, setLandlordInfo] = useState(null);

    const params = useParams();
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();
                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setListing(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchListing();
    }, [params.listingId]);
    // console.log(loading);

    useEffect(() => {
        // Gọi API để lấy thông tin người đăng khi component được tải
        const fetchLandlord = async () => {
            try {
                const res = await fetch(`/api/user/${listing?.userRef}`);
                const data = await res.json();
                setLandlordInfo(data);
            } catch (error) {
                console.log(error);
            }
        };

        // Chỉ gọi API nếu có listing và chưa có thông tin người đăng
        if (listing && !landlordInfo) {
            fetchLandlord();
        }
    }, [listing, landlordInfo]);

    return (
        <main>
            {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
            {error && <p className="text-center my-7 text-2xl">Something went wrong!</p>}
            {listing && !loading && !error && (
                <div>
                    <Swiper navigation>
                        {listing.imageUrls.map((url) => (
                            <SwiperSlide key={url}>
                                <div
                                    className="h-[550px]"
                                    style={{
                                        background: `url(${url}) center no-repeat`,
                                        backgroundSize: 'cover',
                                    }}
                                ></div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
                        <FaShare
                            className="text-slate-500"
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                setCopied(true);
                                setTimeout(() => {
                                    setCopied(false);
                                }, 2000);
                            }}
                        />
                    </div>
                    {copied && (
                        <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">Link copied!</p>
                    )}
                    <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
                        <p className="text-2xl font-semibold">
                            {listing.name} -{' '}
                            {listing.offer
                                ? listing.discountPrice.toLocaleString('en-US')
                                : listing.regularPrice.toLocaleString('en-US')}
                            {listing.type === 'rent' && ' VND / tháng'}
                        </p>
                        <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
                            <FaMapMarkerAlt className="text-green-700" />
                            {listing.address}
                        </p>
                        <div className="flex gap-4">
                            <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                                {listing.type === 'rent' ? 'Cho thuê' : 'For Sale'}
                            </p>
                            {listing.offer && (
                                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                                    {+listing.regularPrice - +listing.discountPrice} OFF
                                </p>
                            )}
                        </div>
                        {/* GoogleMap */}
                        <GoogleMap address={listing.address} />
                        <p className="text-slate-800">
                            <span className="font-semibold text-black">Thông tin liên hệ</span>
                        </p>
                        {landlordInfo && (
                            <table className="min-w-full divide-y divide-gray-200">
                                <tbody>
                                    <tr className="bg-f1f5f1">
                                        <td className="px-6 py-2 whitespace-nowrap font-medium">Người đăng:</td>
                                        <td
                                            className={`px-6 py-2 whitespace-nowrap ${
                                                currentUser ? '' : 'hover:underline'
                                            }`}
                                        >
                                            {currentUser ? (
                                                landlordInfo.username
                                            ) : (
                                                <Link to="/profile">Đăng nhập để xem</Link>
                                            )}
                                        </td>
                                    </tr>
                                    <tr className="bg-blue-100">
                                        <td className="px-6 py-2 whitespace-nowrap font-medium">Số điện thoại:</td>
                                        <td
                                            className={`px-6 py-2 whitespace-nowrap ${
                                                currentUser ? '' : 'hover:underline'
                                            }`}
                                        >
                                            {currentUser ? (
                                                landlordInfo.phoneNumber || 'Chưa cập nhật'
                                            ) : (
                                                <Link to="/profile">Đăng nhập để xem</Link>
                                            )}
                                        </td>
                                    </tr>
                                    <tr className="bg-f1f5f1">
                                        <td className="px-6 py-2 whitespace-nowrap font-medium">Email:</td>
                                        <td
                                            className={`px-6 py-2 whitespace-nowrap ${
                                                currentUser ? '' : 'hover:underline'
                                            }`}
                                        >
                                            {' '}
                                            {currentUser ? (
                                                landlordInfo.email || 'Chưa cập nhật'
                                            ) : (
                                                <Link to="/profile">Đăng nhập để xem</Link>
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
                        <div className="text-slate-800">
                            <p className="font-semibold text-black">Thông tin mô tả</p>
                            <p className="mt-2">{listing.description}</p>
                        </div>
                        <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
                            <li className="flex items-center gap-1 whitespace-nowrap ">
                                <FaBed className="text-lg" />
                                {listing.bedrooms > 1
                                    ? `${listing.bedrooms} giường ngủ `
                                    : `${listing.bedrooms} giường ngủ `}
                            </li>
                            <li className="flex items-center gap-1 whitespace-nowrap ">
                                <FaBath className="text-lg" />
                                {listing.bathrooms > 1
                                    ? `${listing.bathrooms} phòng tắm `
                                    : `${listing.bathrooms} phòng tắm `}
                            </li>
                            <li className="flex items-center gap-1 whitespace-nowrap ">
                                <FaParking className="text-lg" />
                                {listing.parking ? 'Chỗ để xe miễn phí' : 'Không có chỗ để xe'}
                            </li>
                            <li className="flex items-center gap-1 whitespace-nowrap ">
                                <FaWifi className="text-lg" />
                                {listing.furnished ? 'WiFi miễn phí' : 'Không có WiFi'}
                            </li>
                        </ul>
                        {currentUser && listing.userRef !== currentUser._id && !contact && (
                            <button
                                onClick={() => setContact(true)}
                                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
                            >
                                Liên hệ chủ nhà
                            </button>
                        )}
                        {/* Truyền dữ liệu từ Contact component vào Listing component bằng cách thêm một hàm callback vào Contact */}
                        {/* {contact && <Contact listing={listing} />} */}
                        {/* <Contact listing={listing} onLandlordInfo={(info) => setLandlordInfo(info)} /> */}
                        {/* // Trong component Listing */}
                        {/* {contact && <Contact listing={listing} onLandlordInfo={(info) => setLandlordInfo(info)} />} */}
                        {contact && <Contact listing={listing} />} {/* Chỉ truyền listing */}
                    </div>
                </div>
            )}
        </main>
    );
}
