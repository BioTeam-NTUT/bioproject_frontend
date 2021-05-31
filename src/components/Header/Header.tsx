import React from 'react';
import logo from './logo.svg';
import './Header.css';
import {
    Link
} from 'react-router-dom';
import { NavBar } from '../NavBar';

const Header = (props: {}) => {
    return (
        <header className="flex justify-between">
            <Link to="/">
                <img src={logo} className="pointer-events-none min-w-20 min-h-20 animate-spin-low" alt="logo" />
            </Link>
            <NavBar />
        </header>
    );
};

export default Header;