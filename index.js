import express  from "express";
import dotenv from  "dotenv"
dotenv.config()

import mongoose from "mongoose";
import { getHealth } from "./controllers/health.js";
import {postPlant,  getPlants, getPlant, putPlant, deletePlant, } from "./controllers/plant.js";
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
const plants = [
    {
        "id": 1,
        "name": "Banana",
        "category":"Outdoor",
        "image":"https://gardenerspath.com/wp-content/uploads/2019/12/Banana-Plant-with-Fruit.jpg",
        "price":"120",
        "description":"The banana is an attractive herbaceous flowering plant that grows to a mature height of 12 to 18 feet tall."
      },
      {
        "id": 2,
        "name": "Purpul Rose",
        "category": "Indoor",
        "image": "https://th.bing.com/th/id/R.b3c9c675a729178bb7cf36a4be1d9abc?rik=KJcUw9ZpEZei6A&riu=http%3a%2f%2fdawsonsgardenworld.com.au%2fwp-content%2fuploads%2f2013%2f06%2fYoung_0020_Lycidas_0020_Ausvibrant.jpg&ehk=asuj8jle%2fiDzubYRydFNBsVOGj3J997a3%2b%2bvXIpky40%3d&risl=&pid=ImgRaw&r=0",
        "price": "120",
        "description": "This beautiful new floribunda from American breeder Tom Carruth, will remind you of the great Ebb Tide (which is one of its parents). Stunning, dark ruby to purple blooms carrying a delicious “knock your socks off” fragrance. "
    }
]


//check health , use calling function
app.get("/health",getHealth)

// for add
app.post("/plant",postPlant)

//for see all 
app.get("/plants", getPlants)

//for  find data
app.get("/plant/:id",getPlant)

//
app.put("/plant/:id",putPlant)

app.delete ("/plant/:id",deletePlant)

app.use("*", useError)

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)})
