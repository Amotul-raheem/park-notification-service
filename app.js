import express from "express"


const app = express();


const PORT = process.env.PORT

app.use("/booking-notification", authRouter);
app.use("/booking-reminder", authRouter);
app.use("/account-verification", authRouter);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});









