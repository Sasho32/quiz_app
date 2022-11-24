import './Error.scss';

function Error({ message, restartQuiz }) {
    return (
        <div id="error">
            <h1>{message}</h1>
            <button onClick={restartQuiz}>Try again</button>
        </div>
    );
}

export default Error;
