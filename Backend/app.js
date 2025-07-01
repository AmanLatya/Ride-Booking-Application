const dotenv = require("dotenv");
dotenv.config();


const express = require("express");
const app = express();
const cors = require("cors");
const connectToDB = require("./db/db");
connectToDB();
const path = require("path");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended:true}))

const userRoutes = require("./routes/user-router");
app.use("/users",userRoutes);

const captionRoutes = require("./routes/caption-router");
app.use("/captions",captionRoutes);

// app.set("view engine", "ejs"); // SET View engine - EJS
// app.set("views", path.resolve("./views")); // SET the Path of Views Files

app.use(cors());
app.get("/", (req,res) =>{
    res.send("Hii Aman");
})


module.exports = app;