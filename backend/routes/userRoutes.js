import { Router } from "express"
import { createUser,getUsers,loginUser,logoutUser,getCurrentUserProfile,updateCurrentUser, deleteUser, getUserById, updateUserById } from "../controllers/userController.js"
import { authenticateAdmin, authenticateUser } from "../middlewares/authMiddleware.js"


const router = Router()
// User routes

router.get('/',authenticateUser,authenticateAdmin, getUsers)
router.post('/',createUser)
router.post('/auth',loginUser)
router.post('/logout',logoutUser)
router.get('/profile',authenticateUser,getCurrentUserProfile)
router.put('/profile',authenticateUser, updateCurrentUser)

//Admin Routes
router.delete('/:id',authenticateUser,authenticateAdmin,deleteUser)
router.get('/:id',authenticateUser,authenticateAdmin,getUserById)
router.put('/:id',authenticateUser,authenticateAdmin,updateUserById)


export default router;