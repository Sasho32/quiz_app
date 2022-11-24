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
            <h1>CONGRATS, {username}!</h1>
            <h2>
                Your result: {` ${((correctAnswers / 10) * 100).toFixed(2)}%`}
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
                {Object.entries(hintsLeft).map(([key, value]) => {
                    return (
                        <span key={key}>
                            <i className={key}></i>
                            {2 - value} used
                        </span>
                    );
                })}
            </div>
            <button onClick={restartQuiz}>Play again!</button>
        </div>
    );
}

export default Result;
