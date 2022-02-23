import express from "express"
import dotenv from "dotenv";
import bodyParser from "body-parser";
import resetPasswordNotificationRouter from "./routes/ResetPasswordNotificationRouter.js";


dotenv.config()
const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

const PORT = process.env.PORT

app.use("/api/reset-password-notification", resetPasswordNotificationRouter);
// app.use("/booking-reminder", authRouter);)
// app.use("/account-verification", authRouter);
// app.use("/resetPasswordNotification", authRouter);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});









