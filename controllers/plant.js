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
        Data: plants,
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
            Data: updateResult,
            message: "Plant updated successfully"
        })
    }



   
//
const deletePlantId= (req,res)=>{
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
}


//

export{
    postPlant,
    getPlants,
    getPlant,
    putPlantId,
    deletePlantId,
  
}