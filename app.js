 import express from "express"
 import dotenv from "dotenv";
import authRouter from "./routes/resetPasswordNotification.js";

 dotenv.config()
const app = express();


const PORT = process.env.PORT

app.use("/booking-notification", authRouter);
app.use("/booking-reminder", authRouter);
app.use("/account-verification", authRouter);
 app.use("/resetPasswordNotification", authRouter);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});









