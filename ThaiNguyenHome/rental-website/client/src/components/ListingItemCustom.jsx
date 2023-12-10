import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItemCustom({ listing }) {
    function formatNgay(input) {
        const date = new Date(input);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }

    return (
        <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[380px]">
            <Link to={`/listing/${listing._id}`}>
                <img
                    src={
                        listing.imageUrls[0] ||
                        'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
                    }
                    // xử lý nếu ảnh bị lỗi
                    onError={(e) => {
                        e.target.src =
                            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg';
                    }}
                    alt="listing cover"
                    className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
                />
                <div className="p-3 flex flex-col gap-2 w-full">
                    <p className="truncate text-lg font-semibold text-slate-700">{listing.name}</p>
                    <p className="text-sm text-gray-600 line-clamp-2 min-h-[5vh]">{listing.description}</p>
                    <div className="text-slate-700 flex justify-between">
                        <div className="font-bold text-sm">
                            {listing.createdAt && `${formatNgay(listing.createdAt)}`}
                        </div>
                        <div className="font-bold text-sm">{listing.username && `${listing.username}`}</div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
