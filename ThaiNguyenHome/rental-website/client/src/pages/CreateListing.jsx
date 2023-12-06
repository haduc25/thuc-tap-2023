import { useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 100000,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    // console.log('files: ', files);
    console.log('formData: ', formData);

    const handleImageSubmit = (e) => {
        e.preventDefault();
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploading(true);
            setImageUploadError(false);
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }

            Promise.all(promises)
                .then((urls) => {
                    setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
                    setImageUploadError(false);
                    setUploading(false);
                })
                .catch((err) => {
                    setImageUploadError('Image upload failed (2 mb max per image)');
                    setUploading(false);
                });

            /** Promise.all(promises)
             * tạo một promise mới, giải quyết khi tất cả các promise trong mảng promises đã giải quyết.
             * Khi nó giải quyết, urls là một mảng chứa kết quả từ mỗi promise.
             *
             * setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) })
             * cập nhật state formData, thêm các URL mới (urls) vào mảng imageUrls trong formData.
             */
        } else {
            setImageUploadError('You can only upload 6 images per listing');
            setUploading(false);
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    // setFilePerc(Math.round(progress));
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                },
            );
        });
    };

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });

        /** setFormData({ ...formData, imageUrls: formData.imageUrls.filter((_, i) => i !== index) });:
         *
         * setFormData được sử dụng để cập nhật state formData.
         * Một object mới được tạo bằng cách sao chép tất cả thuộc tính từ state formData hiện tại (...formData).
         * imageUrls được cập nhật bằng cách sử dụng phương thức filter để tạo một mảng mới chỉ chứa các phần tử không trùng với chỉ số (index) đã được chọn để xóa.
         * Điều này có nghĩa là hình ảnh tại chỉ số index sẽ bị loại bỏ khỏi mảng imageUrls.
         * Ví dụ: Nếu imageUrls là ['url1', 'url2', 'url3'] và index là 1
         *
         * (ví dụ: nút xóa được nhấp trên hình ảnh thứ hai), sau khi gọi handleRemoveImage(1), imageUrls mới sẽ trở thành ['url1', 'url3'].
         * 
         * == Chi tiết == (.filter((_, i) => i !== index).)
         * .filter((_, i) => ...): Đây là một phương thức của mảng JavaScript, nó tạo ra một mảng mới bằng cách lọc các phần tử dựa trên một hàm điều kiện. 
         * Trong trường hợp này, hàm điều kiện là một hàm lambda (arrow function) với hai tham số: _ và i.
         * (_ , i) => ...: Dấu gạch dưới (_) thường được sử dụng khi bạn không quan tâm đến giá trị của một tham số nào đó. 
         * Trong trường hợp này, giá trị của mỗi phần tử không quan trọng, chúng ta chỉ cần biết vị trí của nó là i.
         * i !== index: Điều kiện này kiểm tra xem chỉ số i của mỗi phần tử có khác với index không. 
         * Nếu có, phần tử đó sẽ được giữ lại trong mảng kết quả; ngược lại, nếu chỉ số i bằng với index, phần tử đó sẽ bị loại bỏ khỏi mảng kết quả.

         * Ví dụ: Nếu imageUrls là ['url1', 'url2', 'url3'] và index là 1, khi chạy .filter((_, i) => i !== index), chỉ số i của 'url1' là 0 và không bằng index, nên 'url1' sẽ được giữ lại. Chỉ số i của 'url2' là 1 (bằng index), nên 'url2' sẽ bị loại bỏ khỏi mảng kết quả. Chỉ số i của 'url3' là 2 và không bằng index, nên 'url3' cũng sẽ được giữ lại. Kết quả là một mảng mới ['url1', 'url3'], là mảng không chứa phần tử tại chỉ số index.
         */
    };

    const handleChange = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent') {
            setFormData({
                ...formData,
                type: e.target.id,
            });
        }
        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked,
            });
        }
        if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.imageUrls.length < 1) return setError('You must upload at least one image');
            if (+formData.regularPrice < +formData.discountPrice)
                return setError('Discount price must be lower than regular price');

            /** if (+formData.regularPrice < +formData.discountPrice)
             *  sử dụng dấu + để chuyển đổi giá trị của `formData.regularPrice` và
             *  `formData.discountPrice` thành kiểu dữ liệu số (number).
             */

            setLoading(true);
            setError(false);

            const res = await fetch('/api/listing/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                }),
            });

            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
                return;
            }

            // go to new items
            navigate(`/listing/${data._id}`);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <main className="p-3 max-w-4xl mx-auto min-h-screen">
            <h1 className="text-3xl font-semibold text-center my-7">Tạo một danh sách phòng cho thuê</h1>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-4 flex-1">
                    <input
                        onChange={handleChange}
                        value={formData.name}
                        type="text"
                        placeholder="Name"
                        className="border p-3 rounded-lg"
                        id="name"
                        maxLength="62"
                        minLength="10"
                        required
                    />
                    <textarea
                        onChange={handleChange}
                        value={FormData.description}
                        type="text"
                        placeholder="Description"
                        className="border p-3 rounded-lg"
                        id="description"
                        required
                    />
                    <input
                        onChange={handleChange}
                        value={FormData.address}
                        type="text"
                        placeholder="Address"
                        className="border p-3 rounded-lg"
                        id="address"
                        maxLength="62"
                        minLength="10"
                        required
                    />

                    <div className="flex gap-6 flex-wrap">
                        <div className="flex gap-2">
                            <input
                                onChange={handleChange}
                                checked={formData.type === 'sale'}
                                type="checkbox"
                                id="sale"
                                className="w-5"
                            />
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                onChange={handleChange}
                                checked={formData.type === 'rent'}
                                type="checkbox"
                                id="rent"
                                className="w-5"
                            />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                onChange={handleChange}
                                checked={formData.parking}
                                type="checkbox"
                                id="parking"
                                className="w-5"
                            />
                            <span>Chỗ để xe</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                onChange={handleChange}
                                checked={formData.furnished}
                                type="checkbox"
                                id="furnished"
                                className="w-5"
                            />
                            <span>WiFi miễn phí</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                onChange={handleChange}
                                checked={formData.offer}
                                type="checkbox"
                                id="offer"
                                className="w-5"
                            />
                            <span>Offer</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6">
                        <div className="flex item-center gap-2">
                            <input
                                onChange={handleChange}
                                value={formData.bedrooms}
                                type="number"
                                id="bedrooms"
                                min="1"
                                max="10"
                                required
                                className="p-3 border border-gray-300 rounded-lg"
                            />
                            <p>Giường ngủ</p>
                        </div>
                        <div className="flex item-center gap-2">
                            <input
                                onChange={handleChange}
                                value={formData.bathrooms}
                                type="number"
                                id="bathrooms"
                                min="1"
                                max="10"
                                required
                                className="p-3 border border-gray-300 rounded-lg"
                            />
                            <p>Phòng tắm</p>
                        </div>
                        <div className="flex item-center gap-2">
                            <input
                                onChange={handleChange}
                                value={formData.regularPrice}
                                type="number"
                                id="regularPrice"
                                min="100000"
                                max="900000000"
                                required
                                className="p-3 border border-gray-300 rounded-lg"
                            />
                            <div className="flex flex-col items-center">
                                <p>Giá đề xuất</p>
                                {formData.type === 'rent' && <span className="text-xs">(VND / tháng)</span>}
                            </div>
                        </div>
                        {formData.offer && (
                            <div className="flex item-center gap-2">
                                <input
                                    onChange={handleChange}
                                    value={formData.discountPrice}
                                    type="number"
                                    id="discountPrice"
                                    min="0"
                                    max="900000000"
                                    required
                                    className="p-3 border border-gray-300 rounded-lg"
                                />
                                <div className="flex flex-col items-center">
                                    <p>Discounted price</p>
                                    {formData.type === 'rent' && <span className="text-xs">(VND / tháng)</span>}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col flex-1 gap-4">
                    <p className="font-semibold">
                        Hình ảnh:
                        <span className="font-normal text-gray-600 ml-2">
                            Hình ảnh đầu tiên sẽ là ảnh bìa (tối đa 6 ảnh)
                        </span>
                    </p>

                    <div className="flex gap-4">
                        <input
                            onChange={(e) => setFiles(e.target.files)}
                            className="p-3 border border-gray-300 rounded w-full"
                            type="file"
                            id="images"
                            accept="image/*"
                            multiple
                        />
                        <button
                            onClick={handleImageSubmit}
                            disabled={uploading}
                            type="button"
                            className="p-3 text-green-700 border rounded uppercase hover:shadow-lg disabled:opacity-80"
                        >
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                    <p className="text-red-700 text-sm">{imageUploadError && imageUploadError}</p>
                    {
                        // Hiển thị files khi upload thành công
                        formData.imageUrls.length > 0 &&
                            formData.imageUrls.map((url, index) => (
                                <div key={index} className="flex justify-between p-3 border items-center">
                                    <img
                                        className="w-20 h-20 object-contain rounded-lg"
                                        src={url}
                                        alt="listing image"
                                    />
                                    <button
                                        onClick={() => handleRemoveImage(index)}
                                        type="button"
                                        className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                                    >
                                        Xóa
                                    </button>
                                </div>
                            ))
                    }

                    <button
                        disabled={loading || uploading}
                        className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                    >
                        {loading ? 'Đang tạo...' : 'Tạo danh sách mới'}
                    </button>
                    {error && <p className="text-red-700 text-sm">{error}</p>}
                </div>
            </form>
        </main>
    );
}
