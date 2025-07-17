import express from "express"
import { getUserDetails, updateUser } from "../Controller/user/userController";
import { authenticate } from "../Middleware/auth";
const router = express.Router();

router.get("/profile",authenticate,getUserDetails)
router.post("/update",authenticate,updateUser)

export default router;