import classes from  './Form.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faLock} from '@fortawesome/free-solid-svg-icons'
import googleIcon from '../../assets/icons/google.png';
const Form = () => {
    return (
        <div className={classes.loginForm}>
            <FontAwesomeIcon icon={faUser} />
            <input className={classes.input} placeholder='Email'/>
            <br/>
        
            <FontAwesomeIcon icon={faLock} />
            <input className={classes.input} placeholder='Password' type='password'/>
            <br/>
            <button className={classes.button}>Login</button>
            <div className={classes.hl}></div>
            <button className={classes.button}><img alt='GoogleIcon' className={classes.icons} src={googleIcon} />Login with google</button>
        </div>
    );
};

export default Form;
