import logo from "../../assets/logo.svg";
import "./Header.css";
import { Link } from "react-router-dom";
import { NavBar } from "../NavBar";

const Header = (_: {}) => {
    const itemLists = [
        {
            path: "/",
            name: "Query",
        },
        {
            path: "/search",
            name: "Search",
        },
    ];

    return (
        <header className="flex">
            <Link to="/">
                <img
                    src={logo}
                    className="pointer-events-none min-w-20 min-h-20 animate-spin-low"
                    alt="logo"
                />
            </Link>

            <NavBar contents={itemLists} />
        </header>
    );
};

export default Header;
