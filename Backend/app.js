const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const app = express();
const connectToDB = require("./db/db");
connectToDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
const userRoutes = require("./routes/user-router");
app.use("/users",userRoutes);


app.use(cors());
app.get("/", (req,res) =>{
    res.send("Hii Aman");
})


module.exports = app;