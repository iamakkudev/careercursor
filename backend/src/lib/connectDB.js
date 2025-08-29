import mongoose from 'mongoose';

export const connectDB = async() =>{
    try {
        const con = await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB Connected: ",con.connection.host)
    } catch (error) {
        console.log("Error connection to mongoDB: ", error.message);
        process.exit(1);
    }
}