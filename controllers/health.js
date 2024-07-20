const getHealth= (req,res)=>{
    res.json({
        success:true,
        message:"Server is up and  Running"

    })
    
}

export{
    getHealth
}