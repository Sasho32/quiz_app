import { useContext } from 'react';
import StatisticsContext from './StatisticsContext';
import './Hint.scss';

function Hint({ currentQuestionRef, type, hintHandler }) {
    const { hintsLeft } = useContext(StatisticsContext);

    const hasLeft = hintsLeft[type];

    return (
        <i
            className={`${type} ${hasLeft ? 'active' : 'inactive'}`}
            onClick={() => {
                if (hasLeft && !currentQuestionRef.current.answered) {
                    hintHandler();
                }
            }}
        >
            {hasLeft ? ` ${hasLeft}` : ''}
        </i>
    );
}

export default Hint;
