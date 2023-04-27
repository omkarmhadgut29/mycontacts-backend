import express from "express";
import * as dotenv from "dotenv";
import router from "./routes/contactRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { connectDb } from "./config/dbConnection.js";
import { userRouter } from "./routes/userRoutes.js";
import path from "path";

dotenv.config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

const __dirname = path.resolve();
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.use("/api/contacts", router);

app.use("/api/user", userRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is listen on port ${port}`);
});
