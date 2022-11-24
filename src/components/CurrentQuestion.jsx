import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
    useContext,
} from 'react';
import rightEffect from '../assets/audio/Heisenberg.mp3';
import wrongEffect from '../assets/audio/Wrong.mp3';
import StatisticsContext from './StatisticsContext';
import './CurrentQuestion.scss';

let wrong = new Audio(wrongEffect);
let right = new Audio(rightEffect);

function stopIfPlaying(audio) {
    if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
    }
}

const mapper = ['a', 'b', 'c', 'd'];
// идеята беше за inline задаване на грид площите на отговорите, но и така стана добре, защото имаме
// консистентни ключове, които реакт си пази, за разлика от отговорите, които всеки път се променят

function CurrentQuestion(
    {
        questionInfo: { question, answers: allAnswers, correctAnswer },
        goToNextQuestion,
        pauseBar,
    },
    ref
) {
    const [hidden, setHidden] = useState([]);
    const [selected, setSelected] = useState('');
    const [hinted, setHinted] = useState('');
    const [shuffledAnswers, setShulffledAnswers] = useState([]);
    const [answered, setAnswered] = useState(false);

    const { updateCorrectAnswers } = useContext(StatisticsContext);

    useEffect(() => {
        setShulffledAnswers(allAnswers.sort(() => Math.random() - 0.5));
        setAnswered(false);
        return () => [right, wrong].forEach(audio => stopIfPlaying(audio));
    }, [question]);

    function restartQuestion() {
        setSelected('');
        setHinted('');
    }

    [right, wrong].forEach(
        audio =>
            (audio.onended = () => {
                restartQuestion();
                setTimeout(() => {
                    setHidden([]);
                    goToNextQuestion();
                }, 500);
            })
    );

    useImperativeHandle(ref, () => {
        return {
            hinted,
            setHinted,
            hidden,
            setHidden,
            answered,
        };
    });

    return (
        <div className="current-question-container">
            <h1 className="question">{question}</h1>
            <ul className={`answers ${answered ? 'answered' : ''}`}>
                {shuffledAnswers.map((answer, index) => {
                    return (
                        <li
                            key={mapper[index]}
                            title={answer}
                            className={`answer ${
                                answer === correctAnswer ? 'right' : 'wrong'
                            } ${answer === selected ? 'selected' : ''} ${
                                !hidden.includes(answer) ? 'visible' : ''
                            } ${answer === hinted ? 'hinted' : ''}`}
                            onClick={() => {
                                if (answered) return;

                                pauseBar();
                                setSelected(answer);
                                setAnswered(true);

                                if (answer !== correctAnswer)
                                    return wrong.play();

                                right.play();
                                updateCorrectAnswers();
                            }}
                        >
                            <span>{answer}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default forwardRef(CurrentQuestion);
