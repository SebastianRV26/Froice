import React, { useEffect, useReducer, useState, useRef } from "react";
//import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import classes from "./UsersEdit.module.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import { faUser, faLock, faAddressCard, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { validateCapitalLetter, validateLowercaseLetter } from '../../utils/Matchers'
import {
  updateEmail,
  updateProfile,
  getAuth,
  updatePassword,
} from "firebase/auth";

const FormEditUser = ({ onSubmit, defaultValues  }) => {
//  const { register, handleSubmit } = useForm({ defaultValues });

  return (
    <div className={classes.Container}>
        <div className={classes.title}>
                    <h1>Edit your profile</h1>
                    <div className={classes.hl} />
                </div>
      <form className={classes.panel} onSubmit={onSubmit}>
        <div className={classes.form}>
          <div className="users-form-label">
            <label className={classes.label}>Name</label>
          </div>
          <div>
            <input
              className={classes.input}
              //{...register("name", { required: "The name is required" })}
              placeholder="Nombre"
            />
          </div>
          <div className="users-form-label">
            <label className={classes.label}>Email</label>
          </div>
          <div>
            <input
              className={classes.input}
              //{...register("email", { required: "The email is required" })}
              placeholder="Email"
            />
          </div>
          <div className="users-form-label">
            <label className={classes.label}>Phone</label>
          </div>
          <div>
            <input
              className={classes.input}
              //{...register("phoneNumber", {required: "The phone is required",})}
              placeholder="Phone"
            />
          </div>
          <Button className={classes.button} type="submit">
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
};
const FormChPassw = ({ onSubmit}) => {
  //const { register, handleSubmit } = useForm();
  const [hasCapitalLetters, setHasCapitalLetters] = useState(false);
  const [hasLowercaseLetters, setHasLowercaseLetters] = useState(false);
  const [hasMinLength, setHasMinLength] = useState(false);
    
    const [icon1, setIcon1] = useState(faXmark);
    const [icon2, setIcon2] = useState(faXmark);
    const [icon3, setIcon3] = useState(faXmark);
    const passwordRef = useRef(false);
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

  return (
    <div className={classes.Container}>
       <div className={classes.title}>
                    <h1>Change your password</h1>
                    <div className={classes.hl} />
                </div>
      <form className={classes.panel2} onSubmit={onSubmit}>
        <div className="users-form-label">
          <label className={classes.label}>Current password</label>
        </div>
        <div>
          <input
            className={classes.input}
            //{...register("password", {required: "The phone is required",})}
            placeholder="Current password"
          />
        </div>
        <div className="users-form-label">
          <label className={classes.label}>New password</label>
        </div>
        <div>
          <input onChange={passwordInputOnChange} ref={passwordRef} faIcon={faLock}
            className={classes.input}
            //{...register("newPassword", {required: "The password is required",})}
            placeholder="New password"
          />
        </div>
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
          <div>
          <label className={classes.label}>Confirm password</label>
          <input
            className={classes.input}
            //{...register("confPassword", {required: "The password is required",})}
            placeholder="Confirm password"
          />
        </div>
        <Button className={classes.button} type="submit">
          Save changes
        </Button>
      </form>
    </div>
  );
};

const EditUser = () => {


  const auth = getAuth();
  //const [state, dispatch] = useReducer(UsersReducer, [], init); //el reducer, initial state, jalar datos de una API o localstorage
  
  let User = {
    name: JSON.parse(localStorage.getItem("user")).displayName,
    email: JSON.parse(localStorage.getItem("user")).email,
    phoneNumber: JSON.parse(localStorage.getItem("user")).phoneNumber,
  };

  const handleUpdate = async (e) => {
    console.log(e)
    const taskDocRef = doc(db, 'users', e.uid)
    try{
      await updateDoc(taskDocRef, {
        name: e.title,
        email: e.email
      })
    } catch (err) {
      alert(err)
    }    
  }

  const UpdateU = (values) => {
    try {
      let uptade = {
        displayName: values.name,
      };
      updateProfile(auth.currentUser, uptade);
      updateEmail(auth.currentUser, values.email);
      console.log("Cambios realizados con exito")

      const actionAdd = {
        type: "update",
        payload: {
          values
        },
      };

    } catch (error) {
      throw error;
    }
  };

  const ChangePassword = (values) =>{
    if (values.newPassword === values.confPassword){
      updatePassword(auth.currentUser, values.newPassword)
      console.log("Cambios realizados con exito")
    }
    else
    console.log("Las contraseñas no coiciden")
  };

  useEffect(() => {
   // localStorage.setItem("user", JSON.stringify(state)); //Key, string
  }, []);

  return (
    <div>
      <FormEditUser onSubmit={UpdateU} defaultValues={User} />
      <FormChPassw onSubmit={ChangePassword} />
    </div>
  );
};
export default EditUser;
