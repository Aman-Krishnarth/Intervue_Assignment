import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentQuestion } from "../../redux/questionSlice/questionSlice";
import { Link, useNavigate } from "react-router-dom";

const AskQuestion = () => {
    const dispatch = useDispatch();

    const currentQuestion = useSelector(
        (state) => state.question.currentQuestion
    );

    const [questionData, setQuestionData] = useState({
        question: "",
        options: [
            { option: "", isCorrect: false, votes: 0 },
            { option: "", isCorrect: false, votes: 0 },
        ],
        time: "60", // Default time is 60 seconds
        totalVotes: 0,
    });

    const [loading, setLoading] = useState(false);

    // Handle changes in the question input
    const handleQuestionChange = (e) => {
        setQuestionData({
            ...questionData,
            question: e.target.value,
        });
    };

    // Handle changes in the option input
    const handleOptionChange = (index, e) => {
        const newOptions = [...questionData.options];
        newOptions[index].option = e.target.value;
        setQuestionData({
            ...questionData,
            options: newOptions,
        });
    };

    // Handle changes in the correct answer radio buttons
    const handleCorrectChange = (index, isCorrect) => {
        const newOptions = [...questionData.options];
        newOptions[index].isCorrect = isCorrect;
        setQuestionData({
            ...questionData,
            options: newOptions,
        });
    };

    // Handle changes in the time select dropdown
    const handleTimeChange = (e) => {
        setQuestionData({
            ...questionData,
            time: parseInt(e.target.value),
        });
    };

    // Function to add a new option
    const addOption = () => {
        setQuestionData({
            ...questionData,
            options: [
                ...questionData.options,
                { option: "", isCorrect: false, votes: 0 },
            ],
        });
    };

    // Function to handle "Ask Question" click
    const handleAskQuestion = () => {
        // Ensure only one correct option is selected
        const correctOptions = questionData.options.filter(
            (opt) => opt.isCorrect
        );

        // If there is not exactly one correct option, return an alert or handle error
        if (correctOptions.length !== 1) {
            alert("Please make sure only one option is marked as correct.");
            return;
        }

        // Start loading state
        setLoading(true);

        // Simulate the process (e.g., API call or dispatch action) with a delay
        setTimeout(() => {
            console.log("Question Data:", questionData);

            dispatch(setCurrentQuestion(questionData)); // Dispatch to set the current question
            setLoading(false); // Stop loading after processing
            // You can optionally navigate if needed
            // navigate("/teacher/askQuestion");
        }, 2000); // Simulate a 2-second delay (adjust as needed)
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-start p-10">
            <button className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                + Intervue Poll
            </button>
            <h1 className="text-2xl font-bold mt-4">
                Let’s{" "}
                <span className="text-black font-extrabold">Get Started</span>
            </h1>
            <p className="text-gray-500 text-lg mt-2 w-1/2">
                You’ll have the ability to create and manage polls, ask
                questions, and monitor your students' responses in real-time.
            </p>

            <Link
                className="text-2xl my-2 font-semibold cursor-pointer"
                to="/teacher/pollHistory"
            >
                View <span className="font-bold">Past Polls</span>
            </Link>

            <div className="mt-6 w-full">
                <label className="block font-bold">Enter your question</label>
                <textarea
                    className="w-full border rounded-lg p-3 mt-2 text-gray-700"
                    rows="2"
                    placeholder="Enter your question here..."
                    value={questionData.question}
                    onChange={handleQuestionChange}
                ></textarea>
                <div className="flex justify-end mt-2">
                    <select
                        className="border rounded-lg p-2 text-gray-700"
                        value={questionData.time}
                        onChange={handleTimeChange}
                    >
                        {["60", "50", "40", "30", "20", "5"].map((time) => (
                            <option key={time} value={time}>
                                {time}s
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mt-6 w-full">
                <div className="flex justify-between">
                    <label className="block font-bold">Edit Options</label>
                    <label className="block font-bold">Is it Correct?</label>
                </div>
                <div className="mt-2 space-y-3">
                    {questionData.options.map((option, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-2"
                        >
                            <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-sm">
                                {index + 1}
                            </span>
                            <input
                                type="text"
                                className="border rounded-lg p-2 flex-grow text-gray-700"
                                value={option.option}
                                onChange={(e) => handleOptionChange(index, e)}
                            />
                            <div className="flex items-center space-x-2">
                                <label className="flex items-center space-x-1">
                                    <input
                                        type="radio"
                                        name={`correct-${index}`}
                                        checked={option.isCorrect}
                                        onChange={() =>
                                            handleCorrectChange(index, true)
                                        }
                                        className="text-purple-600"
                                    />
                                    <span>Yes</span>
                                </label>
                                <label className="flex items-center space-x-1">
                                    <input
                                        type="radio"
                                        name={`correct-${index}`}
                                        checked={!option.isCorrect}
                                        onChange={() =>
                                            handleCorrectChange(index, false)
                                        }
                                        className="text-gray-600"
                                    />
                                    <span>No</span>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={addOption}
                    className="mt-3 text-purple-600 border border-purple-600 px-3 py-1 rounded-lg text-sm"
                >
                    + Add More option
                </button>
            </div>

            <div className="mt-6 w-full flex justify-end py-4 rounded-b-lg border-t-2">
                <button
                    onClick={handleAskQuestion}
                    className="bg-purple-600 text-white px-6 py-2 rounded-2xl text-lg cursor-pointer"
                    disabled={loading} // Disable the button when loading
                >
                    {loading ? <span>Processing...</span> : "Ask Question"}
                </button>
            </div>
        </div>
    );
};

export default AskQuestion;
