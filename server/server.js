import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "https://secure-auth-phi.vercel.app/",
    credentials: true}));

const port = process.env.port || 3000;
connectDB();


app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => res.send("API Working"));

app.listen(port, () => {console.log(`Server started at ${port}`)});
