import React, { useEffect, useState } from "react";
import { AlarmClock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    setTime,
    setSelectedIndex,
} from "../../redux/questionSlice/questionSlice"; // Redux action to update global time

function StudentQuestion() {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Initialize the dispatch function to update Redux state

    // Get the question data from the Redux store
    const questionData = useSelector((state) => state.question.currentQuestion);
    const totalVotes = useSelector((state) => state.question.totalVotes);

    // Get time from the Redux store, directly from the question's time
    const timeLeft = questionData?.time || 60; // Fallback to 60 if the time is not available

    const [selectedOption, setSelectedOption] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [timer, setTimer] = useState(timeLeft); // Set the initial timer from the current question's time

    // Handle option click
    const handleOptionClick = (index) => {
        if (!answered) {
            setSelectedOption(index); // Set the selected option when clicked
        }
    };

    // Handle submit or time-out
    const handleAnswer = () => {
        if (!answered) {
            setAnswered(true);
            const selected = questionData.options[selectedOption];
            dispatch(setSelectedIndex(selectedOption));

            if (selected && selected.isCorrect) {
                setFeedback("Your answer was correct!");
            } else {
                setFeedback("Your answer was wrong.");
            }
        }
    };

    // Timer logic to count down to 0
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => {
                    const newTime = prevTimer - 1;
                    dispatch(setTime(newTime)); // Update the time in Redux store
                    return newTime;
                });
            }, 1000);

            return () => clearInterval(interval); // Clear interval on unmount or time expiration
        } else {
            // Timer has finished, perform any additional logic if needed (e.g., notify teacher, etc.)
        }
    }, [timer, dispatch]);

    useEffect(() => {
        console.log("student question mei hu");
        console.log(questionData);

        if (!questionData || !questionData.question) {
            navigate("/student/waiting");
        }
    }, [questionData]);

    useEffect(() => {
        const role = sessionStorage.getItem("role");

        if (!role || role !== "student") {
            navigate("/");
        }
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen p-8 bg-gray-100">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 space-y-8 flex">
                <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold">
                            Question {questionData.questionNumber}
                        </h2>
                        <div className="flex items-center text-red-500 font-semibold">
                            <AlarmClock className="w-5 h-5 mr-2" />
                            <span>00:{timer < 10 ? `0${timer}` : timer}</span>
                        </div>
                    </div>

                    <div className="bg-gray-800 text-white p-4 rounded-lg mb-6">
                        <p className="text-xl">{questionData.question}</p>
                    </div>

                    <div className="space-y-4">
                        {questionData?.options?.map((option, index) => {
                            const votePercentage = questionData?.totalVotes
                                ? (option.votes / questionData.totalVotes) * 100
                                : 0;

                            return (
                                <div
                                    key={index}
                                    className={`relative flex items-center border-4 rounded-xl cursor-pointer transition duration-200 focus:outline-none z-50 ${
                                        selectedOption === index
                                            ? "bg-blue-500 text-white"
                                            : answered
                                            ? option.isCorrect
                                                ? "border-green-500"
                                                : "border-red-500"
                                            : "bg-gray-200"
                                    }`}
                                    onClick={() => handleOptionClick(index)} // Re-enable option click functionality
                                >
                                    {/* Background div for color and width */}
                                    <div
                                        className={`absolute top-0 left-0 h-full rounded-lg z-0`}
                                        style={{
                                            width: `${votePercentage}%`,
                                            backgroundColor:
                                                answered && option.isCorrect
                                                    ? "green"
                                                    : answered
                                                    ? "red"
                                                    : "transparent",
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

                    <div className="mt-8 flex justify-end">
                        <button
                            className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-purple-700 transition duration-200 ease-in-out cursor-pointer"
                            onClick={handleAnswer}
                            disabled={selectedOption === null || answered} // Disable submit button if no option is selected or already answered
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>

            {/* Feedback Section placed on the right side of the component */}
            {answered && (
                <div className="flex flex-col justify-center items-start pl-8">
                    <p
                        className={`text-lg font-semibold ${
                            feedback === "Your answer was correct!"
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        {feedback}
                    </p>

                    <p className="text-xl font-bold">
                        Wait for the teacher to ask a new question...
                    </p>
                </div>
            )}
        </div>
    );
}

export default StudentQuestion;
