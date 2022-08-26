import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const getHotels = async (req, res, next) => {
    try {
        const { min, max, ...others } = req.query;
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: min | 1, $lt: max || 9990 },
        }).limit(req.query.limit);
        res.status(200).json(hotels);
    } catch (error) {
        next(error);
    }
}

export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (error) {
        next(error);
    }
}

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (error) {
        next(error);
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedHotel);
    } catch (error) {
        next(error);
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Hotel has been deleted" });
    } catch (error) {
        next(error);
    }
}

export const countByCity = async (req, res, next) => {
    try {
        /*const list = await Promise.all(
            cities.map((city) => {
        return Hotel.countDocuments({ city: city });
            })
        );*/
        const list = await Hotel.aggregate([
            { $group: { _id: '$city', count: { $sum: 1 }, image: { $push: "$image" } } },
            { $sort: { count: -1 } }
        ]);
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
};

export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartments" });
        const resortCount = await Hotel.countDocuments({ type: "resorts" });
        const villaCount = await Hotel.countDocuments({ type: "villas" });
        const cabinCount = await Hotel.countDocuments({ type: "cabins" });

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount },
        ]);
    } catch (err) {
        next(err);
    }
};

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(hotel.rooms.map(room => (
            Room.findById(room)
        )))
        res.status(200).json(list)
    } catch (error) {
        next(error);
    }
}

export const getPropertiesByType = async (req, res, next) => {
    try {
        const properties = await Hotel.find({ type: req.params.type });
        res.status(200).json(properties)
    } catch (error) {
        next(error);
    }
}






