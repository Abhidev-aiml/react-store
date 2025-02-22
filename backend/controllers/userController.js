import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/createToken.js";
const prisma = new PrismaClient();

export const createUser = async (req,res) => 
    {
    
    try {
        const {username,password,email} = req.body;
        
        if(!username|!password|!email){
            throw new Error("Please fill all the inputs")
        }
        // check if user exists
        const existingUser = await prisma.user.findFirst({
            where:{
                OR:[
                    {email:email},
                    {username:username}
                ]
            }
        });
        if(existingUser){
            return res.status(400).json({error:"User already exists with this email or username."})
        }


        const hashedPassword = await bcrypt.hash(password,10);

        //create new user
        const newUser = await prisma.user.create({
            data:{
                username,
                password:hashedPassword,
                email,
            }
        });
        try {
            generateToken(res,newUser.id);
            
        } catch (error) {
            return res.json({message:"Error Validating user"})
            
        }
        return res.status(201).json({message:"User created successfully",user:newUser})
        
    } catch (error) {
        return res.status(500).json({message:"Error creating user",error})

        
    }
}

export const getUsers = async(req,res)=>{
   try {
    const users = await prisma.user.findMany({

    })
    if(!users){
        return res.status(400).json({message:"Users not found"})
    }
    return res.json(users)
    
    
   } catch (error) {
    return res.status(400).json({message:"Error finding users"})
    
   }
}

export const loginUser = async(req,res)=>{
    const {email,password} = req.body;

    try {
        const prevUser = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(prevUser){
            const isValidPassword = await bcrypt.compare(password,prevUser.password)
    
            if (isValidPassword) {
                generateToken(res,prevUser.id)
                res.status(200).json(prevUser)
                return
            } else {
                res.status(400).json({message:"Invalid password"})
            }
        } 
        else {
            res.status(400).json({message:"Invalid credentials"})
        }
    } catch (error) {
        res.status(400).json({message:"Error logging in"})
    }
}

export const logoutUser = async (req,res) => {
    res.cookie("jwt","",{
        httpOnly:true,
        expires:new Date(0)
    })

    res.status(200).json({message:"Logged out successfully"})
}

export const getCurrentUserProfile = async (req,res)=>{
   try {
    const currentUser = await prisma.user.findUnique({
        where:{
            id:req.user.id
        },
        select:{
            id:true,username:true,password:true,isAdmin:true
        }
    }) 
    if (!currentUser){
        return res.status(400).json({message:"User not found"})
    }
    return res.status(200).json(currentUser)
   } catch (error) {
    return res.status(400).json({message:"Error finding user",error})
    
   }
}

export const updateCurrentUser = async (req,res) => {
const {email,username,password} = req.body;

try {
    const updateData = {email,username}
    if(password){
        updateData.password = await bcrypt.hash(password,10)
    }

    const updatedUser = await prisma.user.update({
        where:{id:req.user.id},
        data:updateData,
        select:{id:true,email:true,username:true,}
    })
    return res.status(200).json({message:"User updated successfully",updatedUser})
} catch (error) {
    return res.status(400).json({message:"Error updating user",error})
    
}

}

export const deleteUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id); // Convert if ID is an integer (check your schema)
        
        if (isNaN(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const thisUser = await prisma.user.findUnique({
            where: { id: userId }, // Ensure the ID type matches your schema
        });

        if (!thisUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (thisUser.isAdmin) {
            return res.status(400).json({ message: "Cannot delete admin users" });
        }

        await prisma.user.delete({
            where: { id: userId },
        });

        return res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};

export const getUserById = async (req,res)=>{
    const userId = parseInt(req.params.id);
    
    try {
        const userById = await prisma.user.findUnique({
            where:{id:userId}
        })
        if(!userById){
            return res.status(400).json({message:"User does not exists"})

        }
        return res.json(userById)
        
    } catch (error) {
        return res.status(400).json({message:"Error finding user"})
    }

}

export const updateUserById = async(req,res) => {
    const userId = parseInt(req.params.id)
    const {username,email,password,} = req.body

    const isAdmin = Boolean(req.user.isAdmin)

    try {
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            }
          
            
        })
        if(!user){
            return res.status(400).json({message:"User does not exist"})
        }

        const hashedPassword = await bcrypt.hash(password,10)
       const updatedUser = await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                username:username,
                email:email,
                password:hashedPassword,
                isAdmin:isAdmin
            }
        
        })
        return res.status(200).json({message:"User updated successfully",updatedUser})
    } catch (error) {
        return res.status(400).json({message:"Error updating user"})
        
    }

}

