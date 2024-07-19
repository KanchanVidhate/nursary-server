import express  from "express";
import dotenv from  "dotenv"
dotenv.config()

const app = express()
app.use(express.json())

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

// for add
app.post("/plant",(req,res)=>{
    const{
        name,
        category,
        image,
        price,
        description
    } = req.body

     if (!name){
       return  res.json({
            success:false,
            data: null ,
            message: "name is required"
        })
     }
     if (!category){
    
      return  res.json({
            success:false,
            data: null ,
            message: "category is required"
        })
}
     if (!image){

      return  res.json({
            success:false,
            data: null ,
            message: "image is required"
        })
}
     if (!price){

      return  res.json({
            success:false,
            data: null ,
            message: "price is required"
        })      
} 
     if (!description){

      return  res.json({
            success:false,
            data: null ,
            message: "description is required"
        })  
}


const randomId =Math.round( Math.random()*1000)

const newPlant = {
    id: randomId,
    name:name,
    category:category,
    image:image,
    price:price,
    description:description
}
  plants.push(newPlant)

     res.json({
        success: true,
        Data: newPlant,
        message: "Plant added successfully"
        
     })
   
})

//for see all 
app.get("/plants",(req,res)=>{
    res.json({
        success: true,
        Data: plants,
        message: "All plants fetched successfully"

     })
}) 

//for  find data
app.get("/plant/:id",(req,res)=>{
    const {id} = req.params
    const plant = plants.find((plant)=>plant.id == id)

   
    
    res.json({
        success: plant ? true : false,
        Data: plant,
        message : plant ? "Plant fetched successfully" : "Plant not found",

     })
})

//
app.put("/plant/:id",(res,req)=>{
    const{
         name,
        category,
        image,
        price,
        description
    } = req.body


    const {id} = req.params

    let  index = -1

 plants.forEach((plant,i)=>{
    if(plant.id == id){
        index = i
    }
 })

 //
 const newObj = {
     id,
    name,
    category,
    image,
    price,
    description
 }
 if (index ==-1){
    return res.json({
        success: false,
        Data: null,
        message: `Plant not found for id ${id}`,
    })
}
else{
    plants [index] = newObj
    
    return res.json({
        success: true,
        Data: newObj,
        message: "Plant updated successfully"
    })
 
}
  
})

app.delete ("/plant/:id",(req,res)=>{
    const {id} = req.params

    let index = -1

    plants.forEach((plant,i)=>{
        if(plant.id==id){
            index = i
        }
    })

    if(index==-1){
        return res.json({
            success: false,
            Data: null,
            message: `Plant not found for id ${id}`,
        })
    }

plants.splice(index,1)

    res.json({
        success:true,
        message: "Plant deleted successfully",
        data: null

    })
})

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)})
