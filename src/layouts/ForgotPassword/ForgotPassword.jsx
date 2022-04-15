import React, { useRef } from 'react';
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify';
import { auth } from '../../firebase/firebase.config';
import classes from './ForgotPassword.module.css'
import { Input } from '../../components/input/Input.jsx';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import forgotPassword from '../../assets/images/forgotPassword.svg';
let ForgotPassword = () => {
    const navigate = useNavigate();
    const emailRef = useRef(false);

    /*
    const actionCodeSettings = {
        url: 'https://www.example.com/?email=user@example.com',
        iOS: {
            bundleId: 'com.example.ios'
        },
        android: {
            packageName: 'com.example.android',
            installApp: true,
            minimumVersion: '12'
        },
        handleCodeInApp: false
    };
    */

    const handleForgotPassword = () => {
        let email = emailRef.current.value;
        sendPasswordResetEmail(auth, email)
            .then((data) => {
                console.log(data);
                toast.success("Email sended");
                navigate('/login');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode + " " + errorMessage);
                toast.error(errorMessage);
            });
    }

    return (
        <div className={classes.forgotPasswordBody}>
            <div className={classes.leftPanel}>
                <div className={classes.order}>
                    <h1 className={classes.h1}>
                        Forgot
                        <br />
                        password?
                    </h1 >
                    <h3 className={classes.h3}>
                        Dont worry we can help you out! if you still remember your email address you can quickly reset your password.
                        Just input that information in the fields below and click on the button.
                        This will send you a new email that will link you to the password change website.
                    </h3>

                    <div className={classes.hl} />

                    <Input ref={emailRef} faIcon={faUser} placeholder='Email' />

                    <div className={classes.hl} />

                    <Button className={classes.button} onClick={handleForgotPassword} >Send email</Button>
                </div>

            </div>
            <div className={classes.rightPanel}>
                <img className={classes.panelImage} src={forgotPassword} alt="rpi"></img>
            </div>
        </div>
    );
}

export default ForgotPassword;