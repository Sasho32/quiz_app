import { useState, useEffect, useRef, useContext } from 'react';
import useFetch from '../custom-hooks/useFetch';
import { DotLoader } from 'react-spinners';
import Error from './Error';
import Hint from './Hint';
import CurrentQuestion from './CurrentQuestion';
import QuizFooter from './QuizFooter';
import AppContext from '../AppContext';
import './Quiz.scss';
import './Spinner.scss';
import './ProgressBar.scss';

function Quiz({ updateHintCnt, endQuiz }) {
    const {
        details: { category, difficulty },
        restartQuiz,
    } = useContext(AppContext);
    //closure
    function prepareQueryParams() {
        const sanitizedCategory = category
            .split(' ')
            .map(word => word.toLowerCase())
            .join('_');

        const sanitizedDifficulty = difficulty.toLowerCase();

        return {
            sanitizedCategory,
            sanitizedDifficulty,
        };
    }

    const { sanitizedCategory, sanitizedDifficulty } = prepareQueryParams();

    const { loading, error, questions } = useFetch(
        `https://the-trivia-api.com/api/questions?limit=10&categories=${sanitizedCategory}&difficulty=${sanitizedDifficulty}`
    );
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [showBar, setShowBar] = useState(true);
    const currentQuestionRef = useRef(null);
    const barRef = useRef(null);

    useEffect(() => {
        setShowBar(true);
    }, [activeQuestionIndex]);

    function pauseBar() {
        barRef.current.style.setProperty('--animation-state', 'paused');
    }

    function playBar() {
        barRef.current.style.setProperty('--animation-state', 'running');
    }

    function goToNextQuestion() {
        if (activeQuestionIndex === 9) return endQuiz();
        setShowBar(false);
        setActiveQuestionIndex(prev => prev + 1);
    }

    return (
        <>
            {loading && <DotLoader id="loader" />}
            {error && <Error message={error} restartQuiz={restartQuiz} />}
            {questions.length === 10 && (
                <div className="question-container">
                    {showBar && (
                        <div className="bar-wrapper">
                            <div
                                ref={barRef}
                                onAnimationEnd={() => {
                                    goToNextQuestion();
                                }}
                                id="progress-bar"
                            ></div>
                        </div>
                    )}
                    <div className="question-header">
                        <Hint
                            currentQuestionRef={currentQuestionRef}
                            type="fa-solid fa-lightbulb"
                            hintHandler={() => {
                                const { correctAnswer } =
                                    questions[activeQuestionIndex];

                                // ако не е използван още жокерът
                                if (currentQuestionRef.current.hinted === '') {
                                    currentQuestionRef.current.setHinted(
                                        correctAnswer
                                    );
                                    updateHintCnt('fa-solid fa-lightbulb');
                                }
                            }}
                        />
                        <Hint
                            currentQuestionRef={currentQuestionRef}
                            type="fa-solid fa-dice-two"
                            hintHandler={() => {
                                const { correctAnswer, answers } =
                                    questions[activeQuestionIndex];

                                // ако не е използван още жокерът
                                if (!currentQuestionRef.current.hidden.length) {
                                    updateHintCnt('fa-solid fa-dice-two');

                                    const incorrects = answers.filter(
                                        answer => answer !== correctAnswer
                                    );

                                    let firstIndex = Math.floor(
                                        Math.random() * 3
                                    );
                                    let secondIndex = Math.floor(
                                        Math.random() * 3
                                    );

                                    while (firstIndex === secondIndex) {
                                        secondIndex = Math.floor(
                                            Math.random() * 3
                                        );
                                    }

                                    currentQuestionRef.current.setHidden([
                                        incorrects[firstIndex],
                                        incorrects[secondIndex],
                                    ]);
                                }
                            }}
                        />
                    </div>
                    <CurrentQuestion
                        ref={currentQuestionRef}
                        questionInfo={questions[activeQuestionIndex]}
                        goToNextQuestion={goToNextQuestion}
                        pauseBar={pauseBar}
                    />
                    <QuizFooter
                        pauseBar={pauseBar}
                        playBar={playBar}
                        activeQuestionIndex={activeQuestionIndex}
                        endQuiz={endQuiz}
                    />
                </div>
            )}
        </>
    );
}

export default Quiz;
