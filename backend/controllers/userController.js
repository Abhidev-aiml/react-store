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

export const getUser = async(req,res)=>{
    const {email,username} = req.body
   try {
    const user = await prisma.user.findUnique({
        where:{
            email:email // add fn to get users by either email or username
        }
    })
    if(!user){
        return res.status(400).json({message:"User not found"})
    }
    return res.json(user)
    
    
   } catch (error) {
    return res.status(400).json({message:"Error finding user"})
    
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