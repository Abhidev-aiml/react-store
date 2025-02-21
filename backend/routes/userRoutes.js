import { Router } from "express"
import { createUser, getUser,loginUser } from "../controllers/userController.js"

const router = Router()

router.get('/',getUser)
router.post('/',createUser)
router.post('/auth',loginUser)
// router.put('/',updateUser)
// router.delete('/',deleteUser)

export default router;