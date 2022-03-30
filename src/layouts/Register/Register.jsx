import React, { useRef, useState } from 'react';
import classes from "./Register.module.css";
import { Input } from '../../components/input/Input.jsx';
import registerImage from '../../assets/images/registerimage.svg';
import { faUser, faLock, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { Button, ToggleButton } from 'react-bootstrap';
const Register = () => {

    const [checked, setChecked] = useState(false);

    return (
        <div className={classes.registerContainer}>


            <div className={classes.leftPanel}>
                <div className={classes.title}>
                    <h1>Input your information</h1>
                    <div className={classes.hl} />
                </div>
                <div className={classes.registerForm}>
                    <Input faIcon={faUser} placeholder='Email' />
                    <br />
                    <div className={classes.inlineForm}>
                        <Input faIcon={faAddressCard} placeholder='Name' />
                        <div className={classes.space}></div>
                        <Input placeholder='Last name' />
                    </div>

                    <br />
                    <Input faIcon={faLock} type='password' placeholder='Password' />
                    <br />
                    <Input faIcon={faLock} type='password' placeholder='Confirm password' />
                </div>

                <br />

                <div className={classes.title}>

                    <div className={classes.hl} />
                </div>
                <div className={classes.inlineForm}>
                    <input type="checkbox" id="cbox2" value="second_checkbox" /> 
                    <div className={classes.space}></div>
                    <p>I agree with <a href="/"> terms and conditions</a> </p> 
                </div>
                <br />
                <Button className={classes.button} >Register</Button>
            </div>
            <div className={classes.rightPanel}>
                <img src={registerImage} alt="RegisterImage" />
            </div>
        </div>
    );
}


export default Register;