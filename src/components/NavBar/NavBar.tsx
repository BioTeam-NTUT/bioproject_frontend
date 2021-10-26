import "./NavBar.css";
import { NavLink } from "react-router-dom";

interface NavItem {
    path: string;
    name: string;
}
interface PropsDataTypes {
    contents: Array<NavItem>;
    // currentPage: string;
    // onChange: (e: string) => void;
}

const NavBar = (props: PropsDataTypes) => {
    const listItems = props.contents.map((item) => (
        <li key={item.name}>
            <NavLink exact to={item.path} activeStyle={{ opacity: 1.0 }}>
                {item.name}
            </NavLink>
        </li>
    ));

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
