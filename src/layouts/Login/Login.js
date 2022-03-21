import classes from "./Login.module.css";
import NavbarCustom from "../../components/navbar/Navbar";

import LoginForm from '../../components/form/Form.jsx';

const Login = () => {
    return (
        <div className={classes.loginContainer}>
            <NavbarCustom />
            <div className={classes.body}>
            <LoginForm />
            </div>
        </div>
    );
};

export default Login;
