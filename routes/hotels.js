import express from "express";
import {
    countByCity, countByType, createHotel, deleteHotel, getHotel,
    getHotelRooms, getHotels, updateHotel, getPropertiesByType
} from "../controllers/hotel.js";
import { verifyAdmin } from "../util/jwtUtil.js"
const router = express.Router();

router.get("/", getHotels);
router.get("/find/:id", getHotel);
router.post("/", verifyAdmin, createHotel);
router.put("/:id", updateHotel);
router.delete("/:id", verifyAdmin, deleteHotel);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);
router.get("/getProperties/:type", getPropertiesByType);

export default router;