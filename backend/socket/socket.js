const { Server } = require("socket.io");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://intervue-assignment-1.onrender.com",
        methods: ["GET", "POST"],
    },
});

const userSocketMap = {};
let currentQuestion = {};

io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("newQuestion", (data) => {
        console.log("new question aaya hai");
        console.log(data);

        const { question } = data;

        currentQuestion = question;

        io.emit("currentQuestion", question);
    });

    socket.on("vote", (data) => {
        console.log("vote karne aa gaya");

        console.log(data);

        currentQuestion.options[data].votes += 1;
        currentQuestion.totalVotes += 1;

        console.log("CURRENT QUESTION IN THE BACKEND MATE");
        console.log(currentQuestion);

        io.emit("voteDone", {
            options: currentQuestion.options,
            totalVotes: currentQuestion.totalVotes,
        });
    });

    socket.on("finalResult", (data) => {
        console.log("final result mein hu");

        socket.emit("finalValue", currentQuestion);
    });
});

module.exports = { app, server, io };
