import classes from "./Login.module.css";
import NavbarCustom from "../../components/navbar/Navbar";
import Slider from "./../../components/slider/Slider.js";
import LoginForm from '../../components/form/Form.js';

const Login = () => {
    return (
        <div className={classes.loginContainer}>
            <NavbarCustom />
            <div className={classes.body}>
                <Slider slideDef={<LoginForm />} slideAlt={<p></p>} />
            </div>
        </div>
    );
};

export default Login;
