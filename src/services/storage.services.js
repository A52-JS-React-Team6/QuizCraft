import { ref, uploadBytes, getDownloadURL   } from 'firebase/storage';
import { storage,  } from '../config/firebase-config';

export const getPicture = async (uid) => {
    const pictureUrl = await getDownloadURL(ref(storage, `images/${uid}.jpg`))
        return pictureUrl;
}

export const uploadPicture = async (uid, file) => {
    await uploadBytes(ref(storage, `images/${uid}.jpg`), file);
    const urlResponse = await getDownloadURL(ref(storage, `images/${uid}.jpg`))
    return urlResponse;
};
