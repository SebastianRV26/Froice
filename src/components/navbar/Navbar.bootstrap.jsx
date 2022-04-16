import React from 'react';
import froiceLogo from "../../assets/icons/froicelogo.png";
import classes from './Navbar.module.css';
import { Navbar, Container, NavLink} from 'react-bootstrap';

const NavbarCustom = (props) => {
    return (
        <Navbar className={classes.navbar} expand="lg">
            <Container>
                <Navbar.Brand className={classes.navbrand} as={NavLink} to="/">
                    <img id={classes.navbarLogo} alt="froiceLogo" src={froiceLogo} /> Froice
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}





export default NavbarCustom;
