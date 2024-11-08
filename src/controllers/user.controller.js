import { response } from "express";
import { DB_NAME } from "../contants.js";
import{asyncHandler} from "../utils/asyncHandler.js";
import { createConnection } from "mongoose";
import{ApiError} from "../urils/ApiError.js";
import { User } from "../models/user_modles.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import{ApiResponse} from "../utils/Apiresponse.js";




const registerUser = asyncHandler(async(req, res)=>{

    // get user details form frontend 
    // validation -not empty
    // check if user already esist:usernamme,email
    // check for image ,check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in DB
    // remove password and refresh token filed from response check for user createion 
    // return res





    // get user details from forntend
    const {fullname,email,username,password} = req.body
    console.log("email",email);

    // if(fullname === ""){
    //     throw new ApiError(400,"fullname is required")
    // }

    if([fullname,email,username,password].some((field) =>
        field?.trim() === "")
    ){
        throw new ApiError(400,"all fields are required")
    }

   const existedUser = User.findOne({
        $or:[{ username },{ email }]
    })

    if(existedUser){
        throw new ApiError(409,"User with email or username already exist")

    }

   const avatarLocalPath =  req.files?.avatar[0]?.path;
   const coverImagePath  =  req.files?.coverImage[0]?.path;


   if(!avatarLocalPath){
    throw new ApiError(400,"Avatar files is required")
   }


    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImagePath)

    if(!avatar){
        throw new ApiError(400,"Avatar files is required")
    }  
// entry in db

  const user = await  User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url|| " ",
        email,
        password,
        username:username.toLoverCase()
    })
     const createdUser = await User.findById(user._id).select(
        "-password -refreshToken "
     )

     if(!createdUser){
        throw new ApiError(500,"somethig went wrong while registring the user")
     }

    // sending respond 

    return res.status(200).json(
        new ApiResponse(200,createdUser , "User registered successfully")
    )



})


 
export {
    registerUser,
} 