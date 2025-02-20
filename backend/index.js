// packages

import express from "express"
import cookieParser from 'cookie-parser'
import dotenv from "dotenv"

// routes imports
import userRoutes from "./routes/userRoutes.js"


dotenv.config()
const port = process.env.PORT || 5003

const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// Routes
app.get('/',(req,res)=>{
    res.sendStatus(200)
})

app.use('/users',userRoutes)


app.listen(port,()=>console.log(`Server running on port: ${port}`))