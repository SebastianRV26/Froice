import React from "react";
import NewOpinion from "../../components/opinion/NewOpinion/NewOpinion";
import useCreateDocument from "../../hooks/use-create-document";

const CreateOpinion = () => {
  const [addDoc] = useCreateDocument();

  const send = (message, messageChanged) => {
    if (messageChanged) {
      let userId = "XDXDXD";
      let opinion = { userId, message };
      addDoc("opinions", "Opinion", opinion);
    }
  };

  return <NewOpinion onSend={send} />;
};

export default CreateOpinion;
