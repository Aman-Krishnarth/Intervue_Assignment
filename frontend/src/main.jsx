import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StudentRolePage from "./components/RolePage/StudentRolePage.jsx";
import LandingPage from "./components/LandingPage.jsx";
import StudentWaiting from "./components/Student/StudentWaiting.jsx";
import StudentQuestion from "./components/Student/StudentQuestion.jsx";
import StudentKicked from "./components/Student/StudentKicked.jsx";
import AskQuestion from "./components/Teacher/AskQuestion.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import TeacherQuestion from "./components/Teacher/TeacherQuestion.jsx";
import PollHistory from "./components/Teacher/PollHistory.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <LandingPage />,
            },
            {
                path: "/teacher/askQuestion",
                element: <AskQuestion />,
            },
            {
                path: "/teacher/question",
                element: <TeacherQuestion />,
            },
            {
                path: "/teacher/pollHistory",
                element: <PollHistory />,
            },
            {
                path: "/role/student", // Dynamic path with selectedRole as a parameter
                element: <StudentRolePage />, // Empty element as requested
            },
            {
                path: "/student/waiting",
                element: <StudentWaiting />,
            },
            {
                path: "/student/question",
                element: <StudentQuestion />,
            },
            {
                path: "/student/kicked",
                element: <StudentKicked />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
