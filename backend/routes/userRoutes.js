import express from "express"
import {signUp, verify} from "../controllers/userController.js"

const router = express.Router()

router.route('/').post(signUp)
router.route('/verify').post(verify)

export default router