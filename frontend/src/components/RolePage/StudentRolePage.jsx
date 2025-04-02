import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentRolePage() {
    // State for student's name
    const [studentName, setStudentName] = useState("");
    const [isNameEntered, setIsNameEntered] = useState(false);
    const navigate = useNavigate();

    // Handle input change for the student's name
    const handleNameChange = (event) => {
        setStudentName(event.target.value);
        setIsNameEntered(event.target.value.trim() !== ""); // Enable button if name is entered
    };

    const handleClick = ()=>{
        navigate("/student/waiting")
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white">
            {/* Intervue Poll Branding */}
            <h3 className="text-white bg-[#4D0ACD] p-2 rounded-3xl text-sm font-medium mb-6">
                + Intervue Poll
            </h3>

            {/* Heading */}
            <h1 className="text-4xl font-normal mb-4">Let's <span className="font-bold">Get Started</span></h1>

            {/* Description */}
            <p className="text-lg text-[#00000080] w-1/2 mb-8 text-center">
                If you're a student, you'll be able to <span className="font-semibold text-black">submit your answers,</span> participate in live polls, and see how your responses compare with your classmates
            </p>

            {/* Input Field */}
            <div className="mb-8 w-full max-w-md">
                <input
                    type="text"
                    value={studentName}
                    onChange={handleNameChange}
                    className="w-full p-4 text-xl border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4D0ACD] transition duration-200 ease-in-out"
                    placeholder="Enter your name"
                />
            </div>

            {/* Continue Button */}
            <div className="mt-8">
                <button
                    className={`${
                        isNameEntered
                            ? "bg-[#4D0ACD]"
                            : "bg-gray-400 cursor-not-allowed"
                    } text-white px-10 py-3 rounded-2xl text-lg font-semibold transition duration-200 ease-in-out cursor-pointer`}
                    disabled={!isNameEntered} // Disable button if name is empty
                    onClick={handleClick} // Placeholder action
                >
                    Continue
                </button>
            </div>
        </div>
    );
}

export default StudentRolePage;
