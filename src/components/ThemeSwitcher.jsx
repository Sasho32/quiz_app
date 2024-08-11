import { useState } from 'react';
import './ThemeSwitcher.scss';

function ThemeSwitcher() {
    const [theme, setTheme] = useState('light');

    function changeHandler(e) {
        const divTheme = e.target.closest('div#theme');
        const labelSwitcher = e.target.closest('label#switcher');

        divTheme.classList.toggle('dark');
        labelSwitcher.classList.toggle('dark');

        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    }
    return (
        <label id="switcher">
            <span>Switch to {theme === 'light' ? 'dark' : 'light'} mode</span>
            <input type="checkbox" onChange={changeHandler} />
        </label>
    );
}

export default ThemeSwitcher;
