import express from "express";
import * as dotenv from "dotenv";
import router from "./routes/contactRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { connectDb } from "./config/dbConnection.js";
import { userRouter } from "./routes/userRoutes.js";
dotenv.config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/contacts", router);

app.use("/api/user", userRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is listen on port ${port}`);
});
