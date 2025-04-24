import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartForm from "./components/StartForm";
import Quiz from "./components/Quiz";
import Results from "./components/Results.jsx";
import {ThemeProvider} from "./context/ThemeContext.jsx";
import {QuizProvider} from "./context/QuizContext.jsx";
import ThemeSwitcher from "./components/ThemeSwitcher.jsx";
import './App.css';

function App() {
    return (
        <ThemeProvider>
            <QuizProvider>
                <Router>
                    <ThemeSwitcher />
                    <Routes>
                        <Route path="/" element={<StartForm />} />
                        <Route path="/quiz" element={<Quiz />} />
                        <Route path="/results" element={<Results />} />
                    </Routes>
                </Router>
            </QuizProvider>
        </ThemeProvider>
    );
}

export default App;