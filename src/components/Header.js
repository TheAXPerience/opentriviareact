import { useState } from "react";
import { Navbar, NavbarBrand, Collapse, NavbarToggler, Nav, NavItem, NavLink } from "reactstrap";

const Header = () => {
    const [collapse, setCollapse] = useState(false);

    const toggleNavbar = () => {
        setCollapse(!collapse);
    }

    // TODO: github link?
    return (
        <Navbar sticky='top'>
            <NavbarBrand href='/'>
                Open Trivia Game
            </NavbarBrand>
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={collapse} navbar >
                <Nav navbar>
                    <NavItem>
                        <NavLink href='/'>Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href='/scores'>High Scores</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
}

export default Header;