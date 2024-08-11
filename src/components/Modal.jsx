import './Modal.scss';

function Modal({ message, closeModal, handleConfirm }) {
    return (
        <div className="modal-background">
            <div
                className={`modal-container  ${
                    handleConfirm ? 'confirm' : 'info'
                }`}
            >
                {handleConfirm ? (
                    <i className="fa-solid fa-triangle-exclamation"></i>
                ) : (
                    <>
                        <div onClick={closeModal} className="closing-x">
                            &times;
                        </div>
                        <i className="fa-solid fa-circle-info"></i>
                    </>
                )}
                <span>{message}</span>
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
