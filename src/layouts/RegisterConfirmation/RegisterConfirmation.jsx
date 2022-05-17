import { useState } from 'react';
import { Button } from 'react-bootstrap';
import useConfirmationEmail from "../../hooks/use-confirmation-email";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { auth } from "../../firebase/firebase.config";
import classes from './RegisterConformation.module.css'
import registerConfirmationLeft from '../../assets/images/registerConfirmationLeft.svg'
import registerConfirmationRigth from '../../assets/images/registerConfirmationRigth.svg'

const RegisterConfirmation = () => {
    let [authData,setAuthData] = useState(auth.currentUser);
    let [sendConfirmationEmail] = useConfirmationEmail();
    const navigate = useNavigate();

    const reSendConfirmation = async() =>{
        await setAuthData(await auth.currentUser);
        sendConfirmationEmail(authData)
    }
    const verifyHandler = async () => {
        await setAuthData(await auth.currentUser);
        await auth.currentUser.reload();
        console.log(authData);
        if (authData.emailVerified) {
            navigate("/dashboard");
        } else {
            toast.error(
                "El correo no ha sido verificado. Verifique que haya seguido los pasos e intente de nuevo."
            );
        }
    };
    

    return (
        <div className={classes.registerConfirmationBody}>
            
            <h1 className={classes.h1}>Success</h1>
            <br/>
            <br />
            <br />
            <h3>
                We have succsefuly created your new account. But before you start you will have to activate it.
                <br />
                We have sent an activation mail to the email you provided during registration.
                <br />
                It should arrive in a couple of minutes
            </h3>

            <br />
            <br />
            <br />

            <h3>
                If the email has not arrived during 30s you can still click the button below to resend it. 
                <br/>
                We guarantee it will come this time! 
            </h3>
            <br />
            <br />
            <br />

            <Button variant="link" className={classes.link} onClick={()=>reSendConfirmation()} >Resend email verification</Button>
            <br />
            <br />
            <Button className={classes.registerConfirmationButton} onClick={()=>verifyHandler()} >Verify my email</Button>
            <img className={classes.registerConfirmationImageLeft} src={registerConfirmationLeft} alt={"rcl"}/>
            <img className={classes.registerConfirmationImageRigth} src={registerConfirmationRigth} alt={"lcl"}/>
        </div>
    );

}

export default RegisterConfirmation;