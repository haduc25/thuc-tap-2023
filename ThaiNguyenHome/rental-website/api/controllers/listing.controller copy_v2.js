import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) return next(errorHandler(404, 'Listing not found!'));

    // check xem `listing` có phải của người đó hay k?
    if (req.user.id !== listing.userRef) return next(errorHandler(401, 'You can only delete your own listings!'));

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted!');
    } catch (error) {
        next(error);
    }
};

// export const updateListing = async (req, res, next) => {
//     const listing = await Listing.findById(req.params.id);

//     if (!listing) return next(errorHandler(404, 'Listing not found!'));
//     console.log('req.user.id: ', req.user.id);
//     console.log('listing.userRef: ', listing.userRef);
//     console.log('req.user.role: ', req.user.role);
//     console.log('req.user: ', req.user);

//     if (req.user.id !== listing.userRef) return next(errorHandler(401, 'You can only update your own listings!'));
//     //     // Kiểm tra xem user có quyền admin không
//     // if (req.user.role !== 'admin' && req.user.id !== listing.userRef) {
//     //     return next(errorHandler(401, 'You can only update your own listings!'));
//     // }

//     try {
//         const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.status(200).json(updatedListing);
//     } catch (error) {
//         next(error);
//     }
// };

export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) return next(errorHandler(404, 'Listing not found!'));

    if (req.user.role !== 'admin' && req.user.id !== listing.userRef) {
        return next(errorHandler(401, 'You can only update your own listings!'));
    }

    console.log('listing.controller.js_req.params.id (id cua listing): ', req.params.id);
    console.log('listing.controller.js_req.body (body cua listing): ', req.body);
    console.log('listing.controller.listing (body cua listing): ', listing.userRef);

    try {
        // Kiểm tra xem user có quyền admin không
        if (req.user.role === 'admin') {
            // Nếu role là admin, giữ nguyên userRef
            const updatedListing = await Listing.findByIdAndUpdate(
                req.params.id,
                { ...req.body, userRef: listing.userRef },
                { new: true },
            );
            console.log('ADMINNN');
            res.status(200).json(updatedListing);
        } else {
            // Nếu role là user
            const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(updatedListing);
            console.log('USERRRR');

            res.status(200).json(updatedListing);
        }
    } catch (error) {
        next(error);
    }
};

export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) return next(errorHandler(404, 'Listing not found!'));

        // if (req.user.id !== listing.userRef) return next(errorHandler(401, 'You can only update your own listings!'));
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};

export const getListings = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;

        if (offer === undefined || offer === 'false') {
            offer = { $in: [false, true] };
        }

        let furnished = req.query.furnished;

        if (furnished === undefined || furnished === 'false') {
            furnished = { $in: [false, true] };
        }

        let parking = req.query.parking;

        if (parking === undefined || parking === 'false') {
            parking = { $in: [false, true] };
        }

        let type = req.query.type;

        if (type === undefined || type === 'all') {
            type = { $in: ['sale', 'rent'] };
        }

        const searchTerm = req.query.searchTerm || '';

        const sort = req.query.sort || 'createdAt';

        const order = req.query.order || 'desc';

        const listings = await Listing.find({
            name: { $regex: searchTerm, $options: 'i' }, // tìm từ đồng nghĩa
            offer,
            furnished,
            parking,
            type,
        })
            .sort({ [sort]: order })
            .limit(limit)
            .skip(startIndex);

        return res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
};
