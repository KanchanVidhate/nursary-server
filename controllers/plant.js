import Plant from "./../models/plant.js"

//temporary DB  
const plants = []

const postPlant= async (req,res)=>{
    const{
        name,
        category,
        image,
        price,
        description
    } = req.body

const newPlant =  new Plant ({
        name:name,
        category:category,
        image:image,
        price:price,
        description:description
})

 
const savedPlant = await newPlant.save();


     res.json({
        success: true,
        Data: savedPlant,
        message: "Plant added successfully"
        
     })
   
}

const getPlants= async (req,res)=>{
const allPlants = await Plant.find()

    res.json({
        success: true,
        Data:allPlants,
        message: "All plants fetched successfully"

     })
}

//
const getPlant= async(req,res)=>{
    const {id} = req.params
    const plant =await Plant.findById( id )
   
    
    res.json({
        success: plant ? true : false,
        Data: plant,
        message : plant ? "Plant fetched successfully" : "Plant not found",

     })
}

//
 const putPlantId= async (res,req)=>{
    const {
        name,
        category,
        image,
        price,
        description
     } = req.body

    const {id} = req.params
   await Plant.updateOne({_id:id},{
        $set :{

            name:name,
            category:category,
            image:image,
            price:price,
            description:description
        }
    })
       const updatePlant = await Plant.findById(id)

        res.json({
            success: true,
            Data: updatePlant,
            message: "Plant updated successfully"
        })
    }



   
//
const deletePlantId= async(req,res)=>{
    const {id} = req.params

    await Plant.deleteOne({
        _id:id
    })

    res.json({
        success:true,
        message: "Plant deleted successfully",
        data: null

    })
}


//

export{
    postPlant,
    getPlants,
    getPlant,
    putPlantId,
    deletePlantId,
  
}