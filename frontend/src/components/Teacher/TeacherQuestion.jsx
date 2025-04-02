import React, { useEffect, useState } from "react";
import { AlarmClock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setTime } from "../../redux/questionSlice/questionSlice";

function TeacherQuestion() {
    const navigate = useNavigate();

    // Get the question data from Redux state
    const questionData = useSelector((state) => state.question.currentQuestion);
    const dispatch = useDispatch();

    // State variables for timer and answered status
    const [timer, setTimer] = useState(questionData?.time || 60); // Initialize timer with the current question's time
    const [timerActive, setTimerActive] = useState(true);
    const [answered, setAnswered] = useState(false);

    // Timer logic to count down to 0
    useEffect(() => {
        if (timerActive && timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1); // Decrease timer every second
                dispatch(setTime(timer - 1)); // Update time in Redux store
            }, 1000);

            return () => clearInterval(interval); // Clear the interval on cleanup
        } else if (timer === 0 && !answered) {
            // When time runs out, show the answers
            setAnswered(true);
        }
    }, [timer, timerActive, answered, dispatch]); // Dependencies include the timer, dispatch, and answered state

    // Handle "Ask another question" button click
    const handleAskAnotherQuestion = () => {
        setAnswered(false); // Reset the answered state
        setTimer(questionData?.time || 60); // Reset the timer to the initial time
        setTimerActive(true); // Start the timer again

        // Navigate back to ask another question
        navigate("/teacher/askQuestion");
    };

    useEffect(() => {
        console.log("teacher question mein hu");
        console.log(questionData);

        // if (!questionData || !questionData.question) {
        //     navigate("/teacher/askQuestion");
        // }
    }, [questionData]);

    return (
        <div className="flex items-center justify-center min-h-screen p-8 bg-gray-100">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 space-y-8 flex">
                <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold">
                            Question {questionData?.questionNumber}
                        </h2>
                        <div className="flex items-center text-red-500 font-semibold">
                            <AlarmClock className="w-5 h-5 mr-2" />
                            <span>00:{timer < 10 ? `0${timer}` : timer}</span>
                        </div>
                    </div>

                    <div className="bg-gray-800 text-white p-4 rounded-lg mb-6">
                        <p className="text-xl">{questionData?.question}</p>
                    </div>

                    <div className="space-y-4">
                        {questionData?.options?.map((option, index) => {
                            const votePercentage = questionData?.totalVotes
                                ? (option.votes / questionData.totalVotes) * 100
                                : 0;

                            console.log("re render ho raha hu");

                            return (
                                <div
                                    key={index}
                                    className={`relative flex items-center border-4 rounded-xl cursor-pointer transition duration-200 focus:outline-none z-50 ${
                                        option.isCorrect
                                            ? "border-green-500"
                                            : "border-red-500"
                                    }`}
                                >
                                    {/* Background div for color and width */}
                                    <div
                                        className={`absolute top-0 left-0 h-full rounded-lg z-0`}
                                        style={{
                                            width: `${votePercentage}%`,
                                            backgroundColor: option.isCorrect ? "green" : "red"
                                                
                                        }}
                                    />
                                    {/* Content div */}
                                    <div className="flex items-center p-4 w-full relative z-40">
                                        <span className="w-8 h-8 flex items-center justify-center mr-4 bg-gray-300 text-gray-700 font-semibold rounded-full">
                                            {index + 1}
                                        </span>
                                        <span className="text-lg">
                                            {option.option}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Feedback Section */}
            <div className="flex flex-col justify-center items-start pl-8">
                {answered && (
                    <div className="flex flex-col">
                        <p className="text-lg font-semibold text-green-600">
                            Time's up! The options are marked.
                        </p>
                        <button
                            className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-purple-700 transition duration-200 ease-in-out mt-6 cursor-pointer"
                            onClick={handleAskAnotherQuestion}
                        >
                            Ask another question
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TeacherQuestion;
