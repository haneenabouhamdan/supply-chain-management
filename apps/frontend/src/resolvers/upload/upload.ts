import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { storage } from '../../firebase';

export async function uploadFile(file: File) {
  try {
    // const storageRef = ref(storage, `profile_images/${file.name}`);
    // const snapshot = await uploadBytes(storageRef, file);
    // const downloadURL = await getDownloadURL(snapshot.ref);
    // return downloadURL;
  } catch (error) {
    console.error("Error uploading file and saving URL:", error);
    throw error;
  }
}
