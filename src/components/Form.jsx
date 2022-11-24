import { useState } from 'react';
import Dropdown from './Dropdown';
import Modal from './Modal';
import useModal from '../custom-hooks/useModal';
import { setUserInfo } from '../utils/user';
import './Form.scss';

function Form({ details, setDetails, startQuiz }) {
    const { openedModal, openModal, closeModal } = useModal();
    const [focusedDropdownId, setFocusedDropdownId] = useState('none');

    function nameHandler(e) {
        setDetails(prevDetails => {
            return {
                ...prevDetails,
                username: e.target.value,
            };
        });
    }

    function submitHandler(e) {
        e.preventDefault();

        // const hasEmptyFields = Object.entries(details).every(
        //     ([detail, value]) => value !== ''
        // );
        // const nameMatches = details.name.match(/^[A-Z][a-z]+$/) ? true : false;
        // по фенси начин за валидация, can be deleted anytime

        const validFields =
            details.category !== '' && details.difficulty !== '';

        if (!validFields) {
            return openModal();
        }

        setUserInfo({
            username: details.username,
            category: details.category,
            difficulty: details.difficulty,
        });

        startQuiz();
    }

    return (
        <>
            <form onSubmit={submitHandler} className="form-container">
                <div className="inputs-wrapper">
                    <input
                        value={details.username}
                        onClick={() => setFocusedDropdownId('none')}
                        onChange={nameHandler}
                        type="text"
                        placeholder="Username"
                        pattern="^[A-Z][a-z]+$"
                        title="Only latin letters allowed. Must start with a capital one, followed by lowercase letters."
                        required
                    />
                    <Dropdown
                        id="category"
                        details={details}
                        setDetails={setDetails}
                        focusedDropdownId={focusedDropdownId}
                        setFocusedDropdownId={setFocusedDropdownId}
                        optionsList={[
                            'Film and TV',
                            'General Knowledge',
                            'Geography ',
                            'History',
                            'Society and Culture',
                            'Sport and Leisure',
                        ]}
                    />
                    <Dropdown
                        id="difficulty"
                        details={details}
                        setDetails={setDetails}
                        focusedDropdownId={focusedDropdownId}
                        setFocusedDropdownId={setFocusedDropdownId}
                        optionsList={['Easy', 'Medium', 'Hard']}
                    />
                </div>
                <button>Attempt Quiz!</button>
            </form>
            {openedModal && (
                <Modal
                    message="Please select category and difficulty!"
                    closeModal={closeModal}
                />
            )}
        </>
    );
}

export default Form;
