import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../context/QuizContext";
import styles from "../css/Results.module.css";

const Results = () => {
    const navigate = useNavigate();
    const { quizData, resetQuiz } = useContext(QuizContext);
    const { name, score, totalQuestions, questionDetails } = quizData;

    const [showDetails, setShowDetails] = useState(false);
    const [allScores, setAllScores] = useState([]);

    const percentage = (score / totalQuestions) * 100;
    const message =
        percentage >= 75
            ? "Felicitări! Ai făcut o treabă excelentă!"
            : "Mai repeta! Poți face mai bine data viitoare.";

    useEffect(() => {
        const savedScores = JSON.parse(localStorage.getItem("quizScores")) || [];

        const newPercentage = Math.round(percentage);
        const newEntry = {
            name,
            score,
            percentage: newPercentage,
            totalQuestions,
        };

        const existingIndex = savedScores.findIndex((entry) => entry.name === name);

        if (existingIndex !== -1) {
            if (score > savedScores[existingIndex].score) {
                savedScores[existingIndex] = newEntry;
            }
        } else {
            savedScores.push(newEntry);
        }

        localStorage.setItem("quizScores", JSON.stringify(savedScores));

        const highestScore = JSON.parse(localStorage.getItem("highestScore")) || {};
        if (!highestScore[name] || highestScore[name] < score) {
            highestScore[name] = score;
            localStorage.setItem("highestScore", JSON.stringify(highestScore));
        }

        setAllScores(savedScores);
    }, [name, score, totalQuestions, percentage]);

    const handleRestart = () => {
        resetQuiz();
        navigate("/");
    };

    return (
        <div>
            <div className={styles.container}>
                <h2>Rezultate</h2>
                <p className={styles.finalScore}>Scor Final: {score} / {totalQuestions}</p>
                <p className={styles.percentage}>
                    Procentaj: {Math.round(percentage)}%
                </p>
                <p className={styles.message}>{message}</p>

                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className={styles.detailsButton}
                >
                    Vezi Detaliat
                </button>

                {showDetails && (
                    <div className={styles.details}>
                        {questionDetails.map((question, index) => (
                            <div key={index} className={styles.questionDetail}>
                                <p className={styles.questionText}>
                                    {question.text} -{" "}
                                    {question.isCorrect ? (
                                        <span className={styles.success}>✔️ Corect</span>
                                    ) : (
                                        <span className={styles.warning}>❌ Greșit</span>
                                    )}
                                </p>
                                <p className={styles.correctAnswer}>
                                    {question.isCorrect
                                        ? `Răspuns corect: ${question.correctAnswer}`
                                        : `Ai răspuns: ${question.userAnswer}, Răspuns corect: ${question.correctAnswer}`}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                <button onClick={handleRestart} className={styles.resetButton}>
                    Începe din nou
                </button>

            </div>
            <div className={styles.scoreSection}>
                <h3>Score</h3>
                {allScores.length > 0 && (
                    <table className={styles.scoreTable}>
                        <thead>
                        <tr>
                            <th>Utilizator</th>
                            <th>Procentaj</th>
                            <th>Scor</th>
                        </tr>
                        </thead>
                        <tbody>
                        {allScores.map((entry, idx) => (
                            <tr key={idx}>
                                <td>{entry.name}</td>
                                <td>{entry.percentage}%</td>
                                <td>{entry.score}/{entry.totalQuestions}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Results;
