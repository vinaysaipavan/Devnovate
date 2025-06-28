import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./route/index";
import passportJWTStrategy from  "./config/passportJWTStratergy"
import cors from "cors";

dotenv.config();

const app = express();
const db = process.env.MONGO_DB!;

main().then(() => {
  console.log("Connected to MongoDB");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(db);
}

const corsOptions = {
  origin : [
    "http://localhost:5173",
  ],
  optionSuccessStatus : 200
}

app.use(cors(corsOptions))
app.use(passportJWTStrategy.initialize())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use("/api/v1", routes);

app.listen(process.env.PORT, () => {
  console.log(`App is listening on ${process.env.PORT}`);
});
