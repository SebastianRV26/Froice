import React, { useEffect, useState, useRef } from "react";
import { collection } from "firebase/firestore";
import { Button } from "react-bootstrap";
import classes from "./UsersEdit.module.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import useDelete from "../../hooks/use-delete";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import {
  faLock,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  validateCapitalLetter,
  validateLowercaseLetter,
} from "../../utils/Matchers";
import {
  updateEmail,
  updateProfile,
  getAuth,
  updatePassword,
} from "firebase/auth";

const FormEditUser = ({ onSubmit, defaultValues }) => {
  //  const { register, handleSubmit } = useForm({ defaultValues });

  return (
    <div className={classes.Container}>
      <div className={classes.title}>
        <h1>Modificar tu perfil</h1>
        <div className={classes.hl} />
      </div>
      <form className={classes.panel} onSubmit={onSubmit}>
        <div className={classes.form}>
          <div className="users-form-label">
            <label className={classes.label}>Nombre</label>
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
            <label className={classes.label}>Teléfono</label>
          </div>
          <div>
            <input
              className={classes.input}
              //{...register("phoneNumber", {required: "The phone is required",})}
              placeholder="Teléfono"
            />
          </div>
          <Button className={classes.button} type="submit">
            Guardar cambios
          </Button>
        </div>
      </form>
    </div>
  );
};
const FormChPassw = ({ onSubmit }) => {
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
    validateCapitalLetter.test(passwordString)
      ? setHasCapitalLetters(true)
      : setHasCapitalLetters(false);
    validateLowercaseLetter.test(passwordString)
      ? setHasLowercaseLetters(true)
      : setHasLowercaseLetters(false);
    passwordString.length >= 8 ? setHasMinLength(true) : setHasMinLength(false);
  };

  useEffect(() => {
    hasCapitalLetters ? setIcon1(faCheck) : setIcon1(faXmark);
    hasLowercaseLetters ? setIcon2(faCheck) : setIcon2(faXmark);
    hasMinLength ? setIcon3(faCheck) : setIcon3(faXmark);
  }, [hasCapitalLetters, hasLowercaseLetters, hasMinLength]);

  return (
    <div className={classes.Container}>
      <div className={classes.title}>
        <h1>Cambiar tu contraseña</h1>
        <div className={classes.hl} />
      </div>
      <form className={classes.panel2} onSubmit={onSubmit}>
        <div className="users-form-label">
          <label className={classes.label}>Contraseña actual</label>
        </div>
        <div>
          <input
            className={classes.input}
            //{...register("password", {required: "The phone is required",})}
            placeholder="Contraseña actual"
          />
        </div>
        <div className="users-form-label">
          <label className={classes.label}>Nueva contraseña</label>
        </div>
        <div>
          <input
            onChange={passwordInputOnChange}
            ref={passwordRef}
            faIcon={faLock}
            className={classes.input}
            //{...register("newPassword", {required: "The password is required",})}
            placeholder="Nueva contraseña"
          />
        </div>
        <div className={classes.conditionsBox}>
          <div className={classes.inlineForm}>
            <FontAwesomeIcon icon={icon1} />{" "}
            <p>Tiene al menos una letra mayúscula</p>
          </div>
          <div className={classes.inlineForm}>
            <FontAwesomeIcon icon={icon2} />{" "}
            <p>Tiene al menos una letra minúscula</p>
          </div>
          <div className={classes.inlineForm}>
            <FontAwesomeIcon icon={icon3} /> <p>Tamaño de 8 caracteres o más</p>
          </div>
        </div>
        <div>
          <label className={classes.label}>Confirmar contraseña</label>
          <input
            className={classes.input}
            //{...register("confPassword", {required: "The password is required",})}
            placeholder="Confirmar contraseña"
          />
        </div>
        <Button className={classes.button} type="submit">
          Guardar cambios
        </Button>
      </form>
    </div>
  );
};

const EditUser = () => {
  const auth = getAuth();
  const [deleteHook, loading] = useDelete();
  const [deleteModal, setDeleteModal] = useState(false);
  //const [state, dispatch] = useReducer(UsersReducer, [], init); //el reducer, initial state, jalar datos de una API o localstorage

  let User = {
    name: JSON.parse(localStorage.getItem("user")).displayName,
    email: JSON.parse(localStorage.getItem("user")).email,
    phoneNumber: JSON.parse(localStorage.getItem("user")).phoneNumber,
  };

  const handleUpdate = async (e) => {
    console.log(e);
    const taskDocRef = doc(db, "users", e.uid);
    try {
      await updateDoc(taskDocRef, {
        name: e.title,
        email: e.email,
      });
    } catch (err) {
      alert(err);
    }
  };

  const UpdateU = (values) => {
    try {
      let uptade = {
        displayName: values.name,
      };
      updateProfile(auth.currentUser, uptade);
      updateEmail(auth.currentUser, values.email);
      console.log("Cambios realizados con exito");

      const actionAdd = {
        type: "update",
        payload: {
          values,
        },
      };
    } catch (error) {
      throw error;
    }
  };

  const ChangePassword = (values) => {
    if (values.newPassword === values.confPassword) {
      updatePassword(auth.currentUser, values.newPassword);
      console.log("Cambios realizados con exito");
    } else console.log("Las contraseñas no coiciden");
  };

  const deleteUser = () =>{
      deleteHook(
        "users",
        auth.currentUser.uid,
        "Se eliminó el usuario correctamente",
        "Error al eliminar el usuario"
      ).then(() => {
        setDeleteModal((prevDeleteModal) => !prevDeleteModal);
      });
 
  }
  const openDeleteHandler = () => {
    setDeleteModal(true);
  };
  useEffect(() => {
    // localStorage.setItem("user", JSON.stringify(state)); //Key, string
  }, []);

  return (
    <div>
      <FormEditUser onSubmit={UpdateU} defaultValues={User} />
      <FormChPassw onSubmit={ChangePassword} />
      <Button className={classes.button} onClick={openDeleteHandler}>Eliminar cuenta</Button>
      {deleteModal && (
        <ConfirmationModal
          show={deleteModal}
          title="Eliminar cuenta"
          description="Esta acción es permanente ¿está seguro de que desea eliminar su cuenta? "
          onConfirm={deleteUser}
          onHide={setDeleteModal.bind(this, false)}
          loading={loading}
        />
      )}
    </div>
  );
};
export default EditUser;
