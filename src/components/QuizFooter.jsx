import Modal from './Modal';
import useModal from '../custom-hooks/useModal';
import './QuizFooter.scss';

function QuizFooter({ pauseBar, playBar, activeQuestionIndex, endQuiz }) {
    const { openedModal, openModal, closeModal } = useModal();

    return (
        <div className="question-footer">
            <span>{activeQuestionIndex + 1}/10</span>
            <button
                onClick={() => {
                    pauseBar();
                    openModal();
                }}
                id="quit-button"
            >
                Quit
            </button>
            {openedModal && (
                <Modal
                    message="Sure you want to quit?"
                    closeModal={() => {
                        closeModal();
                        playBar();
                    }}
                    handleConfirm={() => {
                        endQuiz();
                    }}
                />
            )}
        </div>
    );
}

export default QuizFooter;
