import { createContext, useState } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const [userName, setUserName] = useState("");
    const [shuffleQuestions, setShuffleQuestions] = useState(false);
    const [timeLimit, setTimeLimit] = useState(10);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizData, setQuizData] = useState({});

    const startQuiz = ({ name, shuffleQuestions, timeLimit }) => {
        setUserName(name);
        setShuffleQuestions(shuffleQuestions);
        setTimeLimit(timeLimit);
        setQuizStarted(true);
    };

    const resetQuiz = () => {
        setUserName("");
        setShuffleQuestions(false);
        setTimeLimit(10);
        setQuizStarted(false);
        setQuizData({});
    };

    return (
        <QuizContext.Provider
            value={{
                userName,
                shuffleQuestions,
                timeLimit,
                quizStarted,
                startQuiz,
                resetQuiz,
                quizData,
                setQuizData
            }}
        >
            {children}
        </QuizContext.Provider>
    );
};
