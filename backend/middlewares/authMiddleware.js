import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authMiddleware = async(req,res,next)=>{
    const token = req.cookies.jwt

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token found" })
        
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await prisma.user.findUnique({
            where:{
                id:decoded.userId
            },
            select:{id:true,username:true,email:true}
        })
        if(!user){
            return res.status(401).json({message:"User not found"})
        }
        req.user = user;
        next()
    } catch (error) {
        return res.status(401).json({message:"Error authenticating user"})
        
    }
}