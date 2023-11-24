import express from "express"
import cors from "cors"
import mongoose from "mongoose"
require('dotenv').config() 

const app = express()
const PORT = 5555

app.use(cors({
    credentials: true,
}))
    
app.listen(PORT , () => {
    console.log(`Server is on PORT ${PORT}`)
})

const MONGO = process.env.MONGO_URL!
mongoose.Promise = Promise
mongoose.connect(MONGO) 
  .then(() => console.log("Databse is connected ! "))
  .catch((error) => console.log("Error" , error))
  