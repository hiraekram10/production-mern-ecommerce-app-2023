import mongoose, { Mongoose } from 'mongoose'

const connectDB= async()=>{
 const  MONGO_URL='mongodb+srv://ecommerce:ecommerce@cluster0.foghwuu.mongodb.net/ecommerce?retryWrites=true&w=majority'

    try{

const conn= await mongoose.connect(MONGO_URL)
console.log(`Connected to DataBase..${conn.connection.host}`.bgMagenta.white)
    }
    catch(error){
 console.log(`Mongo db Error : ${error}.`.bgRed.white)
    }
}
export default connectDB;