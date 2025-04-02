import { useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
    isCurrentQuestionSent,
    setCurrentQuestion,
    setSelectedIndex,
    setVotes,
} from "./redux/questionSlice/questionSlice";
import axios from "axios";

async function addToDb(currentQuestion) {
    try {
        const result = await axios.post(
            "https://intervue-assignment-2iyx.onrender.com/api/v1/poll/create",
            {
                options: currentQuestion.options,
                totalVotes: currentQuestion.totalVotes,
                question: currentQuestion.question,
            }
        );
    } catch (error) {
        console.log("add to db catch");
    }
}

function App() {
    const currentQuestion = useSelector(
        (state) => state.question.currentQuestion
    );
    const isQuestionSent = useSelector((state) => state.question.questionSent);
    const selectedIndex = useSelector((state) => state.question.selectedIndex);
    const isQuestionDone = useSelector(
        (state) => state.question.isQuestionDone
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const socketio = io("https://intervue-assignment-2iyx.onrender.com", {
            transports: ["websocket"],
        });

        console.log("APP mein hu");
        console.log("time = ", currentQuestion.time);
        console.log(currentQuestion);
        console.log(isQuestionSent);

        // Check if question is available and if it has been sent before
        console.log("checking if i can send");
        if (Object.keys(currentQuestion).length > 0 && !isQuestionSent) {
            console.log("Sending question to backend for the first time...");
            console.log(isQuestionSent);
            socketio.emit("newQuestion", {
                question: currentQuestion,
            });
        }

        // console.log("APP MEIN HU SELECTED INDEX = ", selectedIndex);

        if (selectedIndex !== null) {
            socketio.emit("vote", selectedIndex);
        }

        socketio.on("voteDone", (data) => {
            console.log("VOTE DONE KA DATA");
            console.log(data);

            dispatch(setVotes(data));

            dispatch(setSelectedIndex(null));
        });

        socketio.on("currentQuestion", (data) => {
            console.log("CALING CURRENT QUESTION DISPATCH FROM APP.JSX");
            console.log(data);

            dispatch(setCurrentQuestion(data));
            dispatch(isCurrentQuestionSent(true));
            console.log("question sent update kar diya");
            console.log(isQuestionSent);
            const role = sessionStorage.getItem("role");
            console.log("role");
            console.log(role);

            if (role === "teacher") {
                navigate("/teacher/question");
            } else {
                navigate("/student/question");
            }
        });

        if (currentQuestion.time === 0) {
            // yeh question ho gaya brother

            // dispatch karne se pehle ek baar dekh lo

            const role = sessionStorage.getItem("role");

            if (role === "teacher") {
                console.log("teacher hu aur backend pe requst bhej raha hu");

                addToDb(currentQuestion);

                setTimeout(() => {
                    dispatch(setCurrentQuestion({}));
                    dispatch(isCurrentQuestionSent(false));
                    dispatch(setSelectedIndex(null));
                    navigate("/teacher/askQuestion");
                }, 5000);
            } else {
                setTimeout(() => {
                    navigate("/student/waiting");
                }, 5000);
            }
        }

        socketio.on("finalValue", (data) => {
            // idhar pe aayega data

            // isko api call se piche bhejo

            // sab kuch ko reset kardo
            console.log("final value");
            console.log(data);

            console.log("final value se reset kar raha hu");

            // {
            //     currentQuestion: {},
            //     questionSent: false,
            //     selectedIndex: null,
            // }

            setTimeout(() => {
                dispatch(setCurrentQuestion({}));
                dispatch(isCurrentQuestionSent(false));
                dispatch(setSelectedIndex(null));
                navigate("/teacher/askQuestion");
            }, 5000);
        });

        // return () => {
        //     // Cleanup on component unmount
        //     if (socketio) {
        //         socketio.disconnect();
        //     }
        // };
    }, [currentQuestion, selectedIndex]);

    useEffect(() => {
        // console.log("CURRENT QUESTION KI VALUE:");
        // console.log(currentQuestion);
    }, [currentQuestion]);

    return (
        <div>
            <Outlet />
        </div>
    );
}

export default App;
