import React from "react";
import NewOpinion from "../../components/opinion/NewOpinion/NewOpinion";
import useAuth from "../../hooks/use-auth";
import useCreateDocument from "../../hooks/use-create-document";

const CreateOpinion = () => {
  const authData = useAuth();
  const [addDoc] = useCreateDocument();

  const send = (description, messageChanged) => {
    if (messageChanged) {
      const name = authData.user.displayName;
      const userId = authData.user.uid;
      const opinion = {
        name,
        userId,
        description,
        likes: [],
        dislikes: [],
        publishedDate: new Date(),
      };
      addDoc("opinions", "Opinion", opinion);
    }
  };

  return <NewOpinion onSend={send} />;
};

export default CreateOpinion;
