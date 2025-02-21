import { Router } from "express"
import { createUser,getUsers,loginUser,logoutUser,getCurrentUserProfile,updateCurrentUser, deleteUser } from "../controllers/userController.js"
import { authenticateAdmin, authenticateUser } from "../middlewares/authMiddleware.js"


const router = Router()

router.get('/',authenticateUser,authenticateAdmin, getUsers)
router.post('/',createUser)
router.post('/auth',loginUser)
router.post('/logout',logoutUser)
router.get('/profile',authenticateUser,getCurrentUserProfile)
router.put('/profile',authenticateUser, updateCurrentUser)
router.delete('/:id',authenticateUser,authenticateAdmin,deleteUser)

export default router;