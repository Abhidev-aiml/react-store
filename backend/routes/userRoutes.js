import { Router } from "express"
import { createUser, getUser,loginUser, logoutUser } from "../controllers/userController.js"

const router = Router()

router.get('/',getUser)
router.post('/',createUser)
router.post('/auth',loginUser)
router.post('/logout',logoutUser)
// router.put('/',updateUser)
// router.delete('/',deleteUser)

export default router;