import { useState, useEffect } from 'react';

export default function useFetch(url) {
    function handleData(data) {
        const questions = data.map(
            ({ question, correctAnswer, incorrectAnswers }) => ({
                question,
                correctAnswer,
                answers: [correctAnswer, ...incorrectAnswers],
            })
        );
        setQuestions(questions);
        setLoading(false);
    }

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        // да не е с .then и .catch
        // useeffect must not return anything besides a function which is used for clean-up -> затова async IEFE
        // controller e навън, за да има достъп до него clean up-ът
        (async function () {
            try {
                const response = await fetch(url, {
                    signal: controller.signal,
                });
                const data = await response.json();

                handleData(data);
            } catch (error) {
                if (controller.signal.aborted) return;
                setError(error.message);
                setLoading(false);
            }
        })();

        return () => {
            controller.abort();
        };
    }, []);

    return {
        loading,
        error,
        questions,
    };
}
