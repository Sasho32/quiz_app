import './Dropdown.scss';

function Dropdown({
    id,
    details,
    setDetails,
    focusedDropdownId,
    setFocusedDropdownId,
    optionsList,
}) {
    const isMenuOpen = focusedDropdownId === id;
    const selectedOption =
        details[id] || `${id[0].toUpperCase()}${id.slice(1)}`;
    // ако няма селектната опция да изкарва като дефолтна името на dropdown-а с главна буква

    const openMenu = () => setFocusedDropdownId(id);
    const closeMenu = () => setFocusedDropdownId('none');

    const clickMenuHandler = () => (isMenuOpen ? closeMenu() : openMenu());
    const clickOptionHandler = option => {
        setDetails(prevDetails => {
            return { ...prevDetails, [id]: option };
        });
        closeMenu();
    };

    return (
        <div
            onClick={clickMenuHandler}
            className={`select${isMenuOpen ? ' select-clicked' : ''}`}
        >
            <span className="selected">{selectedOption}</span>
            <div className={`caret${isMenuOpen ? ' caret-rotate' : ''}`}></div>
            <ul className={`menu${isMenuOpen ? ' menu-open' : ''}`}>
                {optionsList.map(option => (
                    <li
                        className={option === selectedOption ? 'active' : ''}
                        onClick={() => clickOptionHandler(option)}
                        key={option} // в случая аз ги избирам предварително и няма опасност да се дублират
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dropdown;
