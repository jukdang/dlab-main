import './header.css'
import exLogo from '/ex_main_logo.svg'


const MainHeader = () => {

    return (
        <header>
            <div className='mainLogo'>
                <a>
                    <img src={exLogo} className="logo" alt="Main ex logo" ></img>
                </a>
            </div>
            <nav className="menu">
                <a href="#menu1">menu1</a>
                <a href="#menu2">menu2</a>
                <a href="#menu3">menu3</a>
            </nav>
        </header>
    );
};

export default MainHeader;