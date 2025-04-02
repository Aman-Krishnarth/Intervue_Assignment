import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PollHistory() {
    const [polls, setPolls] = useState([]); // To store the poll data

    useEffect(() => {
        const fetchPollHistory = async () => {
            const result = await axios.get(
                "https://intervue-assignment-2iyx.onrender.com/api/v1/poll/allPolls"
            );

            console.log(result);

            setPolls(result.data.polls);
        };

        fetchPollHistory();
    }, []);

    return (
        <div className="min-h-screen p-8 bg-gray-100">
            <h1 className="text-3xl font-semibold my-4">
                View <strong>Past Poll History</strong>
            </h1>

            <Link
                to="/teacher/askQuestion"
                className="text-xl my-4 hover:underline bg-blue-300 rounded-md px-5 py-2"
            >
                Return to ask questions...
            </Link>

            {polls.length === 0 ? (
                <div className="text-center text-lg font-semibold">
                    No Poll History Available
                </div>
            ) : (
                polls.map((poll, pollIndex) => (
                    <div
                        key={pollIndex}
                        className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 space-y-8 mb-6 flex mt-3"
                    >
                        <div className="flex flex-col w-full">
                            {/* Question Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold">
                                    Question {pollIndex + 1}
                                </h2>
                            </div>

                            {/* Poll Question */}
                            <div className="bg-gray-800 text-white p-4 rounded-lg mb-6">
                                <p className="text-xl">{poll.question}</p>
                            </div>

                            {/* Options */}
                            <div className="space-y-4">
                                {poll.options.map((option, index) => {
                                    const votePercentage = poll.totalVotes
                                        ? (option.votes / poll.totalVotes) * 100
                                        : 0;

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
                                                className="absolute top-0 left-0 h-full rounded-lg z-0"
                                                style={{
                                                    width: `${votePercentage}%`,
                                                    backgroundColor:
                                                        option.isCorrect
                                                            ? "green"
                                                            : "red",
                                                }}
                                            />
                                            {/* Content div */}
                                            <div className="flex items-center p-4 w-full relative z-40">
                                                <span className="w-8 h-8 flex items-center justify-center mr-4 bg-gray-300 text-gray-700 font-semibold rounded-full">
                                                    {index + 1}
                                                </span>
                                                <span className="text-lg">
                                                    {option.option} ({votePercentage}%)
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default PollHistory;
