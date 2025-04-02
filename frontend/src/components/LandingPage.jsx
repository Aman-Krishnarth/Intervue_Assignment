import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function LandingPage() {
    // State to track the selected role (Student or Teacher)
    const [selectedRole, setSelectedRole] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Function to handle button clicks
    const handleRoleSelect = (role) => {
        setSelectedRole(role);
    };

    // Function to check the border style based on the selected role
    const getButtonStyle = (role) => {
        return selectedRole === role
            ? "border-4 border-blue-500"
            : "border-1 border-black";
    };

    const handleClick = (e) => {
        e.preventDefault();

        console.log(selectedRole);

        if (selectedRole === "teacher") {
            sessionStorage.setItem("role", "teacher");
            navigate("/teacher/askQuestion");
        } else {
            sessionStorage.setItem("role", "student");
            navigate("/role/student");
        }
        
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white">
            {/* Heading */}
            <h3 className="text-white bg-[#4D0ACD] p-2 rounded-3xl text-sm font-medium mb-6">
                + Intervue Poll
            </h3>
            <h1 className="text-4xl font-normal mb-4">
                Welcome to the{" "}
                <span className="font-bold">Live Polling System</span>
            </h1>
            <p className="text-lg text-[#00000080] mb-8 text-center">
                Please select the role that best describes you to begin using
                the live polling system
            </p>

            {/* Button Container */}
            <div className="flex space-x-6 max-w-xl w-full mb-8">
                {/* I am a Student Button */}
                <button
                    className={`w-1/2 rounded-2xl text-left p-5 bg-white shadow-lg hover:shadow-xl transition duration-200 ease-in-out cursor-pointer ${getButtonStyle(
                        "student"
                    )}`}
                    onClick={() => handleRoleSelect("student")}
                >
                    <h2 className="text-2xl font-semibold text-[#4D0ACD]">
                        I'm a Student
                    </h2>
                    <p className="text-[#454545] mt-2">
                        Join a live poll as a student, participate, and see the
                        results in real-time.
                    </p>
                </button>

                {/* I am a Teacher Button */}
                <button
                    className={`w-1/2 rounded-2xl text-left p-5 bg-white shadow-lg hover:shadow-xl transition duration-200 ease-in-out cursor-pointer ${getButtonStyle(
                        "teacher"
                    )}`}
                    onClick={() => handleRoleSelect("teacher")}
                >
                    <h2 className="text-2xl font-semibold text-[#4D0ACD]">
                        I'm a Teacher
                    </h2>
                    <p className="text-[#454545] mt-2">
                        Submit answers and view live poll results in real-time
                        as a teacher.
                    </p>
                </button>
            </div>

            {/* Continue Button */}
            <div className="mt-8">
                <button
                    className="bg-[#1D68BD] text-white px-10 py-3 rounded-2xl text-lg font-semibold hover:bg-[#48567a] transition duration-200 ease-in-out cursor-pointer"
                    disabled={!selectedRole}
                    onClick={handleClick}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}

export default LandingPage;
