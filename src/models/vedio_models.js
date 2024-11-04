import mongoose,{Schema} from "mongoose";

const videoSchema = new Schema(
    {
        videofile:{
            type:String,
            required:true,

        },
        thumbnail:{
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true
        },     
         discription:{
            type:String,
            required:true
        }, 
        duration:{
            type:Number, // cloudnary url
            required:true
        },
        views  :{
            type:String,
            required:true
        },    
        
        ispublished:{
            type:Boolean,
            default:true
        },

        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }


    },
    {
        timestamps:true
    }
)

export const vedeo = mongoose.model("vedeo",videoSchema)