import logo from '../assets/imgs/header-logo.png';
import './Header.scss';

function Header() {
    return (
        <header>
            <img src={logo} alt="Quizz app logo" />
        </header>
    );
}

export default Header;
