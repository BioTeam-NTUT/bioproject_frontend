import logo from './logo.svg';
import './Header.css';
import {
    Link
} from 'react-router-dom';
import { NavBar } from '../NavBar';

const Header = (props: {}) => {
    return (
        <header className="Header">
            <Link to="/">
                <img src={logo} className="Header-logo" alt="logo" />
            </Link>
            <NavBar />
        </header>
    );
};

export default Header;