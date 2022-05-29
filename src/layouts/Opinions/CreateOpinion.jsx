import { collection, doc } from "firebase/firestore";
import React from "react";
import NewOpinion from "../../components/opinion/NewOpinion/NewOpinion";
import { db } from "../../firebase/firebase.config";
import useAuth from "../../hooks/use-auth";
import useCreateDocument from "../../hooks/use-create-document";
import useUploadImage from "../../hooks/use-upload-image";
import { resizeImage } from "../../utils/utils";

const CreateOpinion = () => {
  const authData = useAuth();
  const [addDoc] = useCreateDocument();
  const [uploadImage] = useUploadImage();

  const send = async (description, imageFile, messageChanged,tagList) => {
    if (messageChanged) {
      const opinionRef = doc(collection(db, "opinions"));

      const name = authData.user.displayName;
      const userId = authData.user.uid;
      const imagePath = imageFile ? `opinions/${opinionRef.id}.jpg` : null;
      const opinion = {
        name,
        userId,
        description,
        likes: [],
        dislikes: [],
        parent: null,
        publishedDate: new Date(),
        image: imagePath,
        tags: tagList
      };
      await addDoc("opinions", "Opinión", opinion, opinionRef);
      if (imageFile) {
        const resizedImage = await resizeImage({
          file: imageFile,
          maxSize: 1500,
        });
        await uploadImage(imagePath, resizedImage);
      }
      // Refresh
    }
  };

  return <NewOpinion onSend={send} />;
};

export default CreateOpinion;
