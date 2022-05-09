import { collection } from "firebase/firestore";
import { useState } from "react";
import TableFilter from "../../components/TableFilter/TableFilter";
import { db } from "../../firebase/firebase.config";
// import classes from "./Users.module.css";
import edit from "../../assets/icons/edit.svg";
import trash from "../../assets/icons/trash.svg";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import useDelete from "../../hooks/use-delete";
import UserModal from "./UserModal";

const Users = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [usersCollection, setUsersCollection] = useState(
    collection(db, "users")
  );
  const [deleteHook, loading] = useDelete();
  const [modalShow, setModalShow] = useState(false);

  const openDeleteHandler = (user) => {
    setUserId(user.id);
    setDeleteModal(true);
  };

  const modifyHandler = (newUser) => {
    setUser(newUser);
    setModalShow(true);
  };

  const deleteUserHandler = () => {
    deleteHook(
      "users",
      userId,
      "Se eliminó el usuario correctamente",
      "Error al eliminar el usuario"
    ).then(() => {
      setUserId(null);
      setDeleteModal((prevDeleteModal) => !prevDeleteModal);
      setUsersCollection(collection(db, "users"));
    });
  };

  return (
    <>
      <TableFilter
        title="Gestión de usuarios"
        columns={[{ key: "name", label: "Nombre", filter: true }]}
        collection={usersCollection}
        actions={[
          {
            key: "modify",
            label: "Modificar usuario",
            icon: edit,
            actionHandler: (user) => modifyHandler(user),
          },
          {
            key: "delete",
            label: "Eliminar usuario",
            icon: trash,
            actionHandler: openDeleteHandler,
          },
        ]}
      />
      {modalShow && (
        <UserModal
          show={modalShow}
          user={user}
          onHide={() => setModalShow(false)}
          onSuccess={() => setUsersCollection(collection(db, "users"))}
        />
      )}
      {deleteModal && (
        <ConfirmationModal
          show={deleteModal}
          title="Eliminar usuario"
          description="¿Está seguro de que desea eliminar usuario?"
          onConfirm={deleteUserHandler}
          onHide={setDeleteModal.bind(this, false)}
          loading={loading}
        />
      )}
    </>
  );
};

export default Users;
