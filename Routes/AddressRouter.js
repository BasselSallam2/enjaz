import express from "express";
const router = express.Router();
import {authenticateUser} from "../middleware/Authentication.js"
import {addAddress , getAddress , editAddress} from "../Controller/addressController.js"

router.post("/address" , authenticateUser , addAddress) ;
router.put("/address/:addressId" , authenticateUser , editAddress) ;
router.get("/address" , authenticateUser , getAddress) ;




export default router ;