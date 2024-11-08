import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";


import { upload } from "../middlewares/multer.middileware.js";



const router = Router()


router.route("/register").post(
    upload.fields([
        {
            name:"avtar",
            maxCount:1
        },
        {
            name:"coverimage",
            maxCount:1
        }

    ]),
    registerUser
)
// router.route("/login").post(registerUser)


export default router