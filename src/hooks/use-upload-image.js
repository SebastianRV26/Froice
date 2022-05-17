import { ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { toast } from "react-toastify";
import { storage } from "../firebase/firebase.config";

const useUploadImage = () => {
  const [loading, setLoading] = useState(false);

  const uploadImage = (path, file) => {
    const storageRef = ref(storage, path);
    const promise = uploadBytes(storageRef, file).finally(() => setLoading(false));

    return toast.promise(promise, {
      pending: "Subiendo imagen",
      success: "Imagen subida exitosamente",
      error: {
        render() {
          setLoading(false);
          return "Error al subir la imagen";
        },
      },
    });
  };

  return [uploadImage, loading];
};

export default useUploadImage;
