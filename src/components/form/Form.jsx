import React,{useRef} from 'react';
import classes from  './Form.module.css';
import { faUser,faLock} from '@fortawesome/free-solid-svg-icons'
import googleIcon from '../../assets/icons/google.png';
import { Button } from 'react-bootstrap';
import { Input } from '../input/Input.jsx';

const Form = () => {

    const ref = useRef();
    const passwordRef = useRef();
    let onclickLogin = ()=>{
        console.log(ref.current.value);
    }

    return (
        <div className={classes.loginForm}>
            <br/>
            <Input ref={ref} faIcon={faUser} placeholder='Email'/>
            <br/>
            <Input ref={passwordRef} faIcon={faLock} type='password' placeholder='Password' />
            <br/>
            <Button className={classes.button} onClick={onclickLogin} >Login</Button>
            <div className={classes.hl}></div>
            <Button className={classes.button}><img alt='GoogleIcon' className={classes.icons} src={googleIcon} />Login with google</Button>
        </div>
    );

};

export default Form;
