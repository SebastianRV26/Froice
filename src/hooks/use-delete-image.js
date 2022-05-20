import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import { toast } from "react-toastify";
import { storage } from "../firebase/firebase.config";

const useDeleteImage = () => {
  const [loading, setLoading] = useState(false);

  const deleteImage = (path) => {
    const storageRef = ref(storage, path);
    const promise = deleteObject(storageRef).finally(() => setLoading(false));

    return toast.promise(promise, {
      pending: "Elimando imagen",
      success: "Imagen eliminada exitosamente",
      error: {
        render() {
          setLoading(false);
          return "Error al eliminar la imagen";
        },
      },
    });
  };

  return [deleteImage, loading];
};

export default useDeleteImage;
