import { Schema ,model} from "mongoose";

const plantSchema = new Schema({
    name:String,
    category : String,
    image: String,
    description: String,

    timestamps:true

})

const Plant = model("Plant",plantSchema)

export default Plant