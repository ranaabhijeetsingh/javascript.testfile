
import mongoose ,{Schema} from "mongoose"
import jwt from "jsonwevtoken"
import bcrypt from "bcrypt"


const userSchema = new Schema(
    {
        username:{
            type:String,
            required: true,
            unique:true,
            lowecase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required: true,
            unique:true,
            lowecase:true,
            trim:true,
        },
        fullname:{
            type:String,
            required: true,
            trim:true,
            trim:true
        },
        avtar:{
            type: String, // cloudinary urls
            required: true,
        },
        coverImage:{
            type: Stirng,
        },
        watchHistory:{
            type: Schema.Types.ObjectId,
            ref :"vedio"
        },
        password:{
            type: String,
            required:[true, 'password is required']

        },
        refreshToken:{
            type: Stirng
             
        }

    },
    {
        timestamps:true
    }
)
userSchema.pre("save",  async function(next) {
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
}  )

userSchema.methods.ispasswordCorrect = async function (password) {
  return await bcrypt.compare(password,this.password)
}

userSchema.methods.genrateAccessToken = function(){
   return jwt.sigh(
        {
            _id:this._id,
            email: this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )

}

userSchema.methods.genrateRefreahToken = function(){
  return  jwt.sigh(
        {
            _id:this._id,
            email: this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User",userSchema)

