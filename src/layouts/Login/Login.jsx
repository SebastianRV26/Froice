import classes from "./Login.module.css";
import loginImage from '../../assets/images/loginimage.svg';
import froiceLogo from "../../assets/icons/froicelogo.png"
import React, { useRef } from 'react';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import googleIcon from '../../assets/icons/google.png';
import { Button } from 'react-bootstrap';
import { Input } from '../../components/input/Input.jsx';
import useLogin from '../../hooks/use-login';
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { auth } from '../../firebase/firebase.config';

const Login = () => {
    const provider = new GoogleAuthProvider();

    let navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();

    let [login, loading, error] = useLogin();

    let onclickLogin = () => {

        let res = login(emailRef.current.value, passwordRef.current.value);
        console.log(res);
    }

    let onClickLoginWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log(user);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
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
                        <Input ref={emailRef} faIcon={faUser} placeholder='Email' />
                        <br />
                        <Input ref={passwordRef} faIcon={faLock} type='password' placeholder='Password' />
                    </div>
                    <Button className={classes.button} onClick={onclickLogin} >Login</Button>
                    <div className={classes.hl} />
                    <Button className={classes.button} onClick={onClickLoginWithGoogle}><img alt='GoogleIcon' className={classes.icons} src={googleIcon} />Login with google</Button>
                </div>

                <p className={classes.register_paragraph}>Dont have account yet?
                    {" "}<Button
                        variant="link"
                        className={classes.link}
                        onClick={() => navigate('/register')}
                    >
                        register here
                    </Button></p>

                <Button
                    variant="link"
                    className={classes.link}
                    onClick={() => navigate('/forgot')}
                >
                    Forgot your password?
                </Button>

            </div>
            <div className={classes.rightPanel}>
                <img className={classes.loginImage} src={loginImage} alt="LoginImg" />
            </div>

        </div>
    );
};

export default Login;
