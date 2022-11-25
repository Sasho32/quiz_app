import './ThemeSwitcher.scss';

function ThemeSwitcher() {
    function changeHandler(e) {
        const divTheme = e.target.closest('div#theme');
        const labelSwitcher = e.target.closest('label#switcher');

        [divTheme, labelSwitcher].forEach(el => el.classList.toggle('dark'));
    }
    return (
        <label id="switcher">
            <input type="checkbox" onChange={changeHandler} />
        </label>
    );
}

export default ThemeSwitcher;
