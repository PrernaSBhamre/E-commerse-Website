const express=require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}
connectDB();


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.send("hii")
})

app.listen(5000,()=>{
    console.log("Backend running on 5000 port")
})
