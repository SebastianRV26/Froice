import { collection } from "firebase/firestore";
import { useState } from "react";
import TableFilter from "../../components/TableFilter/TableFilter";
import { db } from "../../firebase/firebase.config";
// import classes from "./Users.module.css";

const Users = () => {
  const [usersCollection, setUsersCollection] = useState(
    collection(db, "users")
  );

  return (
    <>
      <TableFilter
        title="Gestión de usuarios"
        columns={[{ key: "name", label: "Nombre", filter: true }]}
        collection={usersCollection}
        onDelete={(userId) => {}}
        onModify={() => {}}
      />
    </>
  );
};

export default Users;
