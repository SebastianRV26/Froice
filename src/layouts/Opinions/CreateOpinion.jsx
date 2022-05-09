import React from "react";
import NewOpinion from "../../components/opinion/NewOpinion/NewOpinion";
import useAuth from "../../hooks/use-auth";
import useCreateDocument from "../../hooks/use-create-document";

const CreateOpinion = () => {
  const authData = useAuth();
  const [addDoc] = useCreateDocument();

  const getTime = () => {
    let current = new Date();
    let date =
      current.getFullYear() +
      "-" +
      (current.getMonth() + 1) +
      "-" +
      current.getDate();
    let time =
      current.getHours() +
      ":" +
      current.getMinutes() +
      ":" +
      current.getSeconds();
    //let dateTime = cDate + " " + cTime;
    return { date, time };
  };

  const send = (description, messageChanged) => {
    if (messageChanged) {
      const name = authData.user.displayName;
      const userId = authData.user.uid;
      const { date, time } = getTime();
      const opinion = { name, userId, description, likes: 0, date, time };
      addDoc("opinions", "Opinion", opinion);
    }
  };

  return <NewOpinion onSend={send} />;
};

export default CreateOpinion;
