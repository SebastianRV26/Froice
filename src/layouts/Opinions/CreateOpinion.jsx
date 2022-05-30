import { collection, doc } from "firebase/firestore";
import React from "react";
import NewOpinion from "../../components/opinion/NewOpinion/NewOpinion";
import { db } from "../../firebase/firebase.config";
import useAuth from "../../hooks/use-auth";
import useCreateDocument from "../../hooks/use-create-document";
import useUploadImage from "../../hooks/use-upload-image";
import { resizeImage } from "../../utils/utils";
import { useSelector } from "react-redux";

const CreateOpinion = (props) => {
  const authData = useAuth();
  const [addDoc] = useCreateDocument();
  const [uploadImage] = useUploadImage();
  const userData = useSelector((state) => state.user.userData);

  const send = async (description, imageFile, messageChanged,location, urls,tagList) => {
    if (messageChanged) {
      const opinionRef = doc(collection(db, "opinions"));

      const name = authData.user.displayName;
      const userId = authData.user.uid;
      const imagePath = imageFile ? `opinions/${opinionRef.id}.jpg` : null;
      const opinion = {
        name,
        userId,
        userPhoto: userData?.photoURL ? userData.photoURL : null,
        description,
        likes: [],
        dislikes: [],
        parent: null,
        publishedDate: new Date(),
        image: imagePath,
        location:location ,
        urls:urls??null,
        tags: tagList,
      };
      await addDoc("opinions", "Opinión", opinion, opinionRef);
      if (imageFile) {
        const resizedImage = await resizeImage({
          file: imageFile,
          maxSize: 1500,
        });
        await uploadImage(imagePath, resizedImage);
      }
      props.onAdd({ id: opinionRef.id, ...opinion });
    }
  };

  return <NewOpinion onSend={send} />;
};

export default CreateOpinion;
