import { Router } from "express"
import { createUser,getUsers,loginUser, logoutUser } from "../controllers/userController.js"
import { authenticateAdmin, authenticateUser } from "../middlewares/authMiddleware.js"


const router = Router()

router.get('/',authenticateUser,authenticateAdmin, getUsers)
router.post('/',createUser)
router.post('/auth',loginUser)
router.post('/logout',logoutUser)
// router.put('/',updateUser)
// router.delete('/',deleteUser)

export default router;