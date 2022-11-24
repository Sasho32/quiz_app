import { useReducer, useState } from 'react';
import StatisticsContext from './StatisticsContext';
import Result from './Result';
import Quiz from './Quiz';

function Statistics() {
    function reducer(currentState, { type, payload }) {
        switch (type) {
            case 'hint used':
                const { hintType } = payload;

                return {
                    ...currentState,
                    hintsLeft: {
                        ...currentState.hintsLeft,
                        [hintType]: currentState.hintsLeft[hintType] - 1,
                    },
                };

            case 'correct answer':
                return {
                    ...currentState,
                    correctAnswers: currentState.correctAnswers + 1,
                };
        }

        return { ...currentState };
    }

    const [statistics, dispatch] = useReducer(reducer, {
        hintsLeft: {
            'fa-solid fa-lightbulb': 2,
            'fa-solid fa-dice-two': 2,
        },
        correctAnswers: 0,
    });

    const [isRunning, setIsRunning] = useState(true);

    return (
        <>
            {isRunning && (
                <StatisticsContext.Provider
                    value={{
                        updateCorrectAnswers: () =>
                            dispatch({ type: 'correct answer' }),
                        hintsLeft: statistics.hintsLeft,
                    }}
                >
                    <Quiz
                        updateHintCnt={hintType =>
                            dispatch({
                                type: 'hint used',
                                payload: { hintType },
                            })
                        }
                        endQuiz={() => setIsRunning(false)}
                    />
                </StatisticsContext.Provider>
            )}
            {!isRunning && <Result statistics={statistics} />}
        </>
    );
}

export default Statistics;
