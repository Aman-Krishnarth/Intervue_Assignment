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
            "http://localhost:8000/api/v1/poll/create",
            {
                options: currentQuestion.options,
                totalVotes: currentQuestion.totalVotes,
                question: currentQuestion.question,
            }
        );

        console.log("result");

        if (result.data.success) {
            alert(result.data.message);
        }
    } catch (error) {
        console.log("add to db catch");
        alert("something went wrong");
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
    const role = sessionStorage.getItem("role");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const socketio = io("http://localhost:8000", {
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

            if (role === "teacher") {
                console.log("teacher hu aur backend pe requst bhej raha hu");

                console.log(currentQuestion);

                addToDb(currentQuestion);

                console.log("ab sab kuch reset kar dunga");
                alert("navigating in 5 seconds");

                setTimeout(() => {
                    dispatch(setCurrentQuestion({}));
                    dispatch(isCurrentQuestionSent(false));
                    dispatch(setSelectedIndex(null));
                    navigate("/teacher/askQuestion");
                }, 5000);
            } else {
                alert("navigating in 5 seconds");
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

            alert("navigating in 5 seconds");

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
