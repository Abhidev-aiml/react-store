import { Router } from "express"
import { createUser, getUser } from "../controllers/userController.js"

const router = Router()

router.get('/',getUser)
router.post('/',createUser)
// router.put('/',updateUser)
// router.delete('/',deleteUser)

export default router;