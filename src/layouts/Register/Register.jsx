import React, { useRef, useState, useEffect } from 'react';
import classes from "./Register.module.css";
import { Input } from '../../components/input/Input.jsx';
import registerImage from '../../assets/images/registerimage.svg';
import { faUser, faLock, faAddressCard, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'react-bootstrap';
import { validateCapitalLetter, validateLowercaseLetter } from '../../utils/Matchers'

import useSignUp from '../../hooks/use-sign-up'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    const [checked, setChecked] = useState(false);

    const [hasCapitalLetters, setHasCapitalLetters] = useState(false);
    const [hasLowercaseLetters, setHasLowercaseLetters] = useState(false);
    const [hasMinLength, setHasMinLength] = useState(false);

    const [icon1, setIcon1] = useState(faXmark);
    const [icon2, setIcon2] = useState(faXmark);
    const [icon3, setIcon3] = useState(faXmark);

    const emailRef = useRef(false);
    const phoneRef = useRef(false);
    const firstNameRef = useRef(false);
    const lastNameRef = useRef(false);
    const passwordRef = useRef(false);
    const confirmPasswordRef = useRef(false);

    let [signUp] = useSignUp();

    let passwordInputOnChange = (event) => {
        let passwordString = event.target.value;
        validateCapitalLetter.test(passwordString) ? setHasCapitalLetters(true) : setHasCapitalLetters(false);
        validateLowercaseLetter.test(passwordString) ? setHasLowercaseLetters(true) : setHasLowercaseLetters(false);
        passwordString.length >= 8 ? setHasMinLength(true) : setHasMinLength(false);
    }
    
    useEffect(() => {
        hasCapitalLetters ? setIcon1(faCheck) : setIcon1(faXmark);
        hasLowercaseLetters ? setIcon2(faCheck) : setIcon2(faXmark);
        hasMinLength ? setIcon3(faCheck) : setIcon3(faXmark);
    }, [hasCapitalLetters, hasLowercaseLetters, hasMinLength])
    


    let handleOnclickRegister = (event) => {

        let firstName = firstNameRef.current.value;
        let lastName = lastNameRef.current.value;
        let email = emailRef.current.value;
        let password = passwordRef.current.value;
        let phone = phoneRef.current.value;



        if (!hasCapitalLetters || !hasLowercaseLetters || !hasMinLength) {
            toast.error("Some on your password pattern are wrong");
        }
        else if (!checked) {
            toast.error("Need to check the terms and conditions");
        } else if (firstName === '' || lastName === '' || email === '' || phone === '' || password === '') {
            toast.error("Empty fields");
        } else {
            signUp(email, password, firstName, lastName, phone);
        }
    }

    let handleToggleButton = (event) => {
        setChecked(!checked);
    }



    return (
        <div className={classes.registerContainer}>
            <div className={classes.leftPanel}>
                <div className={classes.title}>
                    <h1>Input your information</h1>
                    <div className={classes.hl} />
                </div>
                <div className={classes.registerForm}>
                    <Input ref={emailRef} faIcon={faUser} placeholder='Email' />
                    <br />
                    <div className={classes.inlineForm}>
                        <Input ref={firstNameRef} faIcon={faAddressCard} placeholder='First Name' />
                        <div className={classes.space}></div>
                        <Input ref={lastNameRef} faIcon={faAddressCard} placeholder='Last Namename' />
                    </div>
                    <br />
                    <Input ref={phoneRef} type='phone' placeholder='Phone' />
                    <br />
                    <Input onChange={passwordInputOnChange} ref={passwordRef} faIcon={faLock} type='password' placeholder='Password' />
                    <br />
                    <div className={classes.conditionsBox}>
                        <div className={classes.inlineForm}>
                            <FontAwesomeIcon icon={icon1} /> <p>Has at least 1 capital letter</p>
                        </div>
                        <div className={classes.inlineForm}>
                            <FontAwesomeIcon icon={icon2} /> <p>Has at least 1 lowercase letter</p>
                        </div>
                        <div className={classes.inlineForm}>
                            <FontAwesomeIcon icon={icon3} /> <p>Length is 8 characters or more</p>
                        </div>
                    </div>
                    <br />
                    <Input ref={confirmPasswordRef} faIcon={faLock} type='password' placeholder='Confirm password' />
                </div>

                <br />

                <div className={classes.title}>

                    <div className={classes.hl} />
                </div>
                <div className={classes.inlineForm}>
                    <input onChange={handleToggleButton} type="checkbox" id="cbox2" />
                    <div className={classes.space}></div>
                    <p>I agree with <a href="/"> terms and conditions</a> </p>
                </div>
                <br />
                <Button onClick={handleOnclickRegister} className={classes.button} >Register</Button>
            </div>
            <div className={classes.rightPanel}>
                <img src={registerImage} alt="RegisterImage" />
            </div>
        </div>
    );
}


export default Register;