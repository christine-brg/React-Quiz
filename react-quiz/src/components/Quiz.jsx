import { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../context/QuizContext";
import questionsData from "../data/questions.json";
import styles from "../css/Quiz.module.css";

const Quiz = () => {
    const navigate = useNavigate();
    const { quizStarted, shuffleQuestions, timeLimit, userName, setQuizData } = useContext(QuizContext);
    const [remainingQuestions, setRemainingQuestions] = useState([]);
    const [usedQuestions, setUsedQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(timeLimit);
    const [showAnswer, setShowAnswer] = useState(false);
    const [questionsAnswered, setQuestionsAnswered] = useState(0);
    const [questionsInitialized, setQuestionsInitialized] = useState(false);


    const totalQuestions = 20;

    useEffect(() => {
        if (!quizStarted) {
            navigate("/");
        }
    }, [quizStarted, navigate]);

    useEffect(() => {
        let questionsToUse = [...questionsData];
        if (shuffleQuestions) {
            questionsToUse = questionsToUse.sort(() => Math.random() - 0.5);
        }
        setRemainingQuestions(questionsToUse.slice(0, totalQuestions));
        setQuestionsInitialized(true);
    }, [shuffleQuestions]);

    useEffect(() => {
        if (!currentQuestion && remainingQuestions.length > 0 && questionsInitialized) {
            const nextQuestion = shuffleQuestions
                ? remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)]
                : remainingQuestions[0];

            setCurrentQuestion(nextQuestion);
            setRemainingQuestions(prev => prev.filter(q => q !== nextQuestion));
            setUsedQuestions(prev => [...prev, nextQuestion]);
            if (timeLimit !== 0) {
                setTimer(timeLimit);
            }
        }
    }, [currentQuestion, remainingQuestions, timeLimit, shuffleQuestions, questionsInitialized]);

    useEffect(() => {
        if (timeLimit === 0 || showAnswer || !currentQuestion) return;

        const countdown = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(countdown);
                    handleAnswer(null);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [currentQuestion, showAnswer, timeLimit]);

    const handleAnswer = useCallback((answer) => {
        if (!currentQuestion) return;

        setSelectedAnswer(answer);
        setShowAnswer(true);

        currentQuestion.userAnswer = answer;

        if (answer === currentQuestion.correct) {
            setScore(prev => prev + 1);
        }

        setTimeout(() => {
            setSelectedAnswer(null);
            setShowAnswer(false);
            setCurrentQuestion(null);
            setQuestionsAnswered(prev => prev + 1);
        }, 1500);
    }, [currentQuestion]);

    // When quiz is finished
    useEffect(() => {
        if (questionsInitialized && remainingQuestions.length === 0 && !currentQuestion) {
            setQuizData({
                name: userName,
                score,
                totalQuestions,
                questionDetails: usedQuestions.map(q => ({
                    text: q.question,
                    correctAnswer: q.correct,
                    userAnswer: q.userAnswer,
                    isCorrect: q.correct === q.userAnswer,
                }))
            });
            navigate("/results");
        }
    }, [questionsInitialized, remainingQuestions, currentQuestion, score, totalQuestions, usedQuestions, userName, setQuizData, navigate]);

    if (!currentQuestion) return <div className={styles.quizContainer}>Se încarcă...</div>;

    return (
        <div className={styles.quizContainer}>
            <h3>Întrebarea {questionsAnswered + 1}</h3>
            <p><strong>{currentQuestion.category}</strong> | {currentQuestion.difficulty}</p>
            <h2>{currentQuestion.question}</h2>

            <p className={styles.timer}>⏱️ Timp rămas: {timeLimit === 0 ? '-' : `${timer}s`}</p>

            <div className={styles.options}>
                {currentQuestion.options.map((opt, index) => {
                    const isCorrect = showAnswer && opt === currentQuestion.correct;
                    const isWrong = showAnswer && opt === selectedAnswer && opt !== currentQuestion.correct;
                    return (
                        <button
                            key={index}
                            onClick={() => handleAnswer(opt)}
                            disabled={showAnswer}
                            className={`${styles.optionButton} ${isCorrect ? styles.correct : ""} ${isWrong ? styles.wrong : ""}`}
                        >
                            {opt}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Quiz;
