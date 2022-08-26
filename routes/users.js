import express from "express";
import {
    updateUser,
    deleteUser,
    getUser,
    getUsers,
} from "../controllers/user.js";
import { verifyUser, verifyAdmin } from "../util/jwtUtil.js";

const router = express.Router();
/*router.get("/checkauthentication", verifyToken, (req, res, next) => {
    res.send("hello user, you are logged in")
})
router.get("/checkuser/:id", verifyUser, (req, res, next) => {
    res.send("hello user, you are logged in and you can delete your account")
})*/
/*router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
    res.send("hello admin, you are logged in and you can delete all accounts")
})*/

router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/:id", verifyUser, getUser);
router.get("/", getUsers);

export default router;