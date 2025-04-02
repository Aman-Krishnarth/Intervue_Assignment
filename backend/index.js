const express = require("express");
const connectDB = require("./models/connectDB");
require("dotenv").config();
const cors = require("cors");
const { app, server } = require("./socket/socket.js");
const pollRouter = require("./routes/pollRouter.js")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("HELLO FROM THE SERVER!");
});

app.use("/api/v1/poll",pollRouter)

server.listen(8000, () => {
    connectDB();
    console.log("SERVER IS RUNNING ON PORT 8000");
});
