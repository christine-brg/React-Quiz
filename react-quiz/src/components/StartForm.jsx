import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../context/QuizContext";
import styles from "../css/StartForm.module.css";

const StartForm = () => {
    const { startQuiz } = useContext(QuizContext);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [shuffle, setShuffle] = useState(false);
    const [time, setTime] = useState("10");
    const [error, setError] = useState("");

    const handleStart = () => {
        if (!name.trim()) {
            setError("Te rog introdu un nume.");
            return;
        }

        setError("");

        startQuiz({
            name: name.trim(),
            shuffleQuestions: shuffle,
            timeLimit: parseInt(time),
        });

        navigate("/quiz");
    };

    return (
        <div className={styles.container}>
            <h2>Începe Quiz-ul</h2>
            <input
                type="text"
                placeholder="Nume"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
            />

            <label className={styles.checkbox}>
                <input
                    type="checkbox"
                    checked={shuffle}
                    onChange={(e) => setShuffle(e.target.checked)}
                />
                Ordine aleatorie a întrebărilor
            </label>

            <label className={styles.label}>Timp per întrebare:</label>
            <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={styles.select}
            >
                <option value="5">5 secunde</option>
                <option value="10">10 secunde</option>
                <option value="0">Fără limită de timp</option>
            </select>

            {error && <p className={styles.error}>{error}</p>}

            <button className={styles.startButton} onClick={handleStart}>
                Start Quiz
            </button>
        </div>
    );
};

export default StartForm;
