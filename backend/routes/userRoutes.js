import express from "express"
import { signUp, verify, addFavourites, uploadProfilePic } from "../controllers/userController.js"
import authenticateUser from "../middlewares/authMiddleware.js"
import multer from "multer";

const upload = multer({ dest: 'uploads/' });

const router = express.Router()

router.route('/').post(signUp)
router.route('/verify').post(verify)
router.route('/favourites').post(authenticateUser, addFavourites)
router.route('/uploads').post(upload.single('file'), uploadProfilePic) // add authentication middleware

export default router