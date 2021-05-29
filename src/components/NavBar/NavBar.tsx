import React from 'react';
import './NavBar.css';
// import {
//     NavLink,
//     Link
// } from 'react-router-dom';

interface PropsDataTypes {
  contents: Array<string>;
  // currentPage: string;
  // onChange: (e: string) => void;
}

const NavBar = (props: PropsDataTypes) => {
  const listItems = props.contents.map((name) => <li className=""><a href="#">{name}</a></li>);

  return (
    <>
      <nav className="header-nav">
        <ul>{listItems}</ul>
      </nav>
      <span className="target"></span>
    </>
  );
};

export default NavBar;
