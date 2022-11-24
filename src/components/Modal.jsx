import './Modal.scss';

function Modal({ message, closeModal, handleConfirm }) {
    return (
        <div className="modal-background">
            <div
                className={`modal-container  ${
                    handleConfirm ? 'confirm' : 'info'
                }`}
            >
                <div onClick={closeModal} className="closing-x">
                    &times;
                </div>
                <h1>{message}</h1>
                {handleConfirm && (
                    <div className="options">
                        <button onClick={handleConfirm}>Yes</button>
                        <button onClick={closeModal}>No</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Modal;
