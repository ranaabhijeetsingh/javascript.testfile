import mongoose from "mongoose";
import { DB_NAME } from "../contants";


const connectDB = async () =>{
    try {
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       console.log(`\n MongoDB connceted!! DB HOST: ${connectionInstance.Connection.host}`);
        
    } catch (error) {
        console.log("MONGODB connection error",error);
        process.exit(1)

    }
}

export default connectDB

// console.log("HELLO WORLD");