import { useState } from 'react';
import Form from './components/Form';
import Header from './components/Header';
import Statistics from './components/Statistics';
import ThemeSwitcher from './components/ThemeSwitcher';
import { getUserInfo } from './utils/user';
import AppContext from './AppContext';

function App() {
    const [started, setStarted] = useState(false);

    const [details, setDetails] = useState({
        username: '',
        category: '',
        difficulty: '',
    });

    function startQuiz() {
        setStarted(true);
    }

    function restartQuiz() {
        setStarted(false);

        const { username, category, difficulty } = getUserInfo();

        setDetails({
            username,
            category,
            difficulty,
        });
    }

    return (
        <>
            <Header />
            {!started && (
                <Form
                    details={details}
                    setDetails={setDetails}
                    startQuiz={startQuiz}
                />
            )}
            {started && (
                <AppContext.Provider
                    value={{
                        details,
                        restartQuiz,
                    }}
                >
                    <Statistics />
                </AppContext.Provider>
            )}
            <ThemeSwitcher />
        </>
    );
}

export default App;
