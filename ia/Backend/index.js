//const express =  require('express');
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Routes from "./routes/Routes.js";
import cors from "cors";

//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();


// Configuración de cors

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

//routes

app.use("/fruits", Routes);


//port
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`);
});
