import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectDB from "./db/database.js";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
connectDB();



app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((request, response, next) => {
    console.log(`Request method is ${request.method} & Request URL is ${request.url}`);
    next();
});
app.use(cookieParser());

import cors from "cors";
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
}));


app.use("/api/v1/users", userRoutes);
app.use("/api/v1/todos", todoRoutes);


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});



