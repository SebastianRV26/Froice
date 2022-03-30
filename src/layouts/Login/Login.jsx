import classes from "./Login.module.css";
import loginImage from '../../assets/images/loginimage.svg';
import froiceLogo from "../../assets/icons/froicelogo.png"
import React, { useRef } from 'react';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import googleIcon from '../../assets/icons/google.png';
import { Button } from 'react-bootstrap';
import { Input } from '../../components/input/Input.jsx';


const Login = () => {

    const ref = useRef();
    const passwordRef = useRef();

    let onclickLogin = () => {
        console.log(ref.current.value);
    }

    return (
        <div className={classes.loginContainer}>
            <div className={classes.leftPanel}>

                <div className={classes.title} href="/" >
                    <img className={classes.froiceLogo} src={froiceLogo} alt="froiceLogo" />
                    <h1>Froice Login</h1>
                </div>

               

                <div className={classes.loginForm}>

                    <div className={classes.input_form}>
                        <Input ref={ref} faIcon={faUser} placeholder='Email' />
                        <br />
                        <Input ref={passwordRef} faIcon={faLock} type='password' placeholder='Password' />
                    </div>
                    <Button className={classes.button} onClick={onclickLogin} >Login</Button>
                    <div className={classes.hl}/>
                    <Button className={classes.button}><img alt='GoogleIcon' className={classes.icons} src={googleIcon} />Login with google</Button>
                </div>
                
                <p className={classes.register_paragraph}>Dont have account yet? <a href="/register">register here</a></p>

            </div>
            <div className={classes.rightPanel}>
                <img className={classes.loginImage} src={loginImage} alt="LoginImg" />
            </div>

        </div>
    );
};

export default Login;
