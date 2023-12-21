import { Nav, NavItem, NavLink } from "reactstrap";
import './Header.css'

const Header = () => {
    return (
        <Nav className='justify-content-end bg-transparent' tabs fill>
            <NavItem className='header-tab'>
                <NavLink href='/' className="text-dark">Quiz Game</NavLink>
            </NavItem>
            <NavItem className='header-tab'>
                <NavLink href='/scores' className="text-dark">High Scores</NavLink>
            </NavItem>
        </Nav>
    );
}

export default Header;