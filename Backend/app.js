const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const app = express();
const connectToDB = require("./db/db");
connectToDB();
const path = require("path");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended:true}))
const userRoutes = require("./routes/user-router");
app.use("/users",userRoutes);


// app.set("view engine", "ejs"); // SET View engine - EJS
// app.set("views", path.resolve("./views")); // SET the Path of Views Files

app.use(cors());
app.get("/", (req,res) =>{
    res.send("Hii Aman");
})


module.exports = app;