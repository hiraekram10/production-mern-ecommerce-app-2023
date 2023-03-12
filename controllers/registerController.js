import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import JWT from "jsonwebtoken"
import userModel from "../models/userModel.js"
//register function
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body
        //Validator
        if (!name || !email || !password || !phone ) {
            return res.status(402).send({ message: "please fill all required fields" })
        }
        //check user 
        const existinguser = await userModel.findOne({ email: email })

        //existing user 
        if (existinguser) {
            return res.status(200).send({
                success: false,
                message: "Already registered please login"
            })
        }
        //register user 
        const hashedPassword = await hashPassword(password)
        //SAVE
        const user = await new userModel({
            name,
            email,
            phone,
            password: hashedPassword,
        }).save();

        res.status(201).send({
            success: true,
            message: 'User registered Successfully',
            user
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error
        })
    }

}



// LOGIN || post
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            })
        }
        //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            })
        }
        const match = await comparePassword(password, user.password)

        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid password"
            })

        }
        //token 
       const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
       res.status(200).send({
        success:true,
        message:"login suuccesfully",
        user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            role:user.role,
        },
        token,
       })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })

    }
}


//test Controller 

export const testController = (req, res) => {
  
    res.send("PROTECTED ROUTE")
}