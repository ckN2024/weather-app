import express from "express"
import { signUp, verify, addFavourites } from "../controllers/userController.js"
import authenticateUser from "../middlewares/authMiddleware.js"

const router = express.Router()

router.route('/').post(signUp)
router.route('/verify').post(verify)
router.route('/favourites').post(authenticateUser, addFavourites)

export default router