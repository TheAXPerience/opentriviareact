import { Nav, NavItem, NavLink } from "reactstrap";

const Header = () => {
    return (
        <Nav className='justify-content-end bg-transparent' tabs>
            <NavItem>
                <NavLink href='/' className="text-dark">Home</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href='/scores' className="text-dark">High Scores</NavLink>
            </NavItem>
        </Nav>
    );
}

export default Header;