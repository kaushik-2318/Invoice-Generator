import dotenv from "dotenv";
import express, { Application, Request, Response, NextFunction } from "express";
import mongooseConnection from "./config/mongoose.config";
import cors from "cors";

dotenv.config();

const corsOptions: cors.CorsOptions = {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

const app: Application = express();

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";

mongooseConnection();

app.use("/auth", userRoutes);
app.use("/product", productRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
