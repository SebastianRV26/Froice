import React from 'react';
import froiceLogo from "../../assets/icons/froicelogo.png";
import classes from './Navbar.module.css';


const NavbarCustom = (props) => {
    return (
        <nav className={classes.navbar}>
            <a href="/">
                <img id={classes.navbarLogo} alt="froiceLogo" src={froiceLogo} />
            </a>
            <h2 className={classes.headerNavbar}>Froice</h2>
            
            {props.buttonText !== undefined && <button className={classes.navbarButton} >{props.buttonText}</button>}
        </nav>
    );
}


export default NavbarCustom;