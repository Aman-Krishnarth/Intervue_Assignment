import React from "react";

function StudentWaiting() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white">
            {/* Intervue Poll Branding */}
            <h3 className="text-white bg-[#4D0ACD] p-2 rounded-3xl text-sm font-medium mb-6">
                + Intervue Poll
            </h3>

            {/* Spinning Loader */}
            <div className="mb-6">
                <div className="w-16 h-16 border-8 border-[#4D0ACD] border-solid rounded-full border-t-transparent animate-spin"></div>
            </div>

            {/* Waiting Message */}
            <h2 className="text-2xl font-bold text-black text-center mb-4">
                Wait for the teacher to ask questions...
            </h2>
        </div>
    );
}

export default StudentWaiting;
