import { Link } from 'react-router-dom';
import './Header.css'
import exLogo from '/ex_main_logo.svg'


const Header = () => {

    return (
        <header>
            <div className='mainLogo'>
                <a>
                    <img src={exLogo} className="logo" alt="Main ex logo" ></img>
                </a>
            </div>
            <nav className="menu">
                <Link to="/">Home</Link>
                <Link to="/JackBoard">JackBoard</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </nav>
        </header>
    );
};

export default Header;