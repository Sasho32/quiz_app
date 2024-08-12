import { useContext } from 'react';
import AppContext from '../AppContext';
import './Result.scss';

function Result({ statistics: { correctAnswers, hintsLeft } }) {
    const {
        details: { username },
        restartQuiz,
    } = useContext(AppContext);

    const incorrectAnswers = 10 - correctAnswers;

    return (
        <div className="results">
            <h1>Congratulations, {username}!</h1>
            <h2>
                Your result:{' '}
                <span>{` ${((correctAnswers / 10) * 100).toFixed(2)}%`}</span>
            </h2>
            <div className="answers">
                <span
                    style={{
                        flexGrow: correctAnswers,
                    }}
                    className="correct"
                >
                    {correctAnswers}
                    <i className="fa-solid fa-circle-check"></i>
                </span>
                <span
                    style={{
                        flexGrow: incorrectAnswers,
                    }}
                    className="incorrect"
                >
                    {incorrectAnswers}
                    <i className="fa-solid fa-circle-xmark"></i>
                </span>
            </div>
            <div className="jokers">
                <span>Jokers used:</span>
                {Object.entries(hintsLeft).map(([key, value]) => {
                    return (
                        <span key={key}>
                            <i className={key}>
                                <span>
                                    {key.includes('lightbulb')
                                        ? 'Half Cut'
                                        : 'Bullseye'}
                                </span>
                            </i>
                            {2 - value}
                        </span>
                    );
                })}
            </div>
            <button onClick={restartQuiz}>Play again!</button>
        </div>
    );
}

export default Result;
