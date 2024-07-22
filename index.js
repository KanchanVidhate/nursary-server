import express  from "express";
import dotenv from  "dotenv"
dotenv.config()

import mongoose from "mongoose";
import { getHealth } from "./controllers/health.js";
import {postPlant,  getPlants, getPlant, putPlantId, deletePlantId, } from "./controllers/plant.js";
import {useError} from "./controllers/errors.js";

const app = express()
app.use(express.json())

const dbConnection=async()=>{
    const conn = await mongoose.connect(process.env.MONGO_URI)

    if(conn){
        console.log('MongoDB Connected..✔')
    }
else{
        console.log('MongoDB Not Conneced..❌')
     }
  }
  dbConnection();

//temporary DB  



//check health , use calling function
app.get("/health",getHealth)

// for add
app.post("/plant",postPlant)

//for see all 
app.get("/plants", getPlants)

//for  find data
app.get("/plant/:id",getPlant)

// updae
app.put("/plant/:id",putPlantId)

app.delete ("/plant/:id",deletePlantId)

app.use("*", useError)

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)})
