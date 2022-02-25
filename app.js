import express from "express"
import dotenv from "dotenv";
import bodyParser from "body-parser";
import resetPasswordNotificationRouter from "./routes/ResetPasswordNotificationRouter.js";
import accountVerificationRouter from "./routes/AccountVerificationRouter.js";


dotenv.config()
const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

const PORT = process.env.PORT

app.use("/api/reset-password-notification", resetPasswordNotificationRouter);
app.use("/api/account-verification", accountVerificationRouter);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});









