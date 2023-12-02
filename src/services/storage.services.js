import { ref, uploadBytes, getDownloadURL   } from 'firebase/storage';
import { storage,  } from '../config/firebase-config';

export const getPicture = async (username, fileName) => {
        const fileExt = fileName.split('.').pop().toLowerCase();
        console.log('fileExt', fileExt);
        const pictureUrl = await getDownloadURL(ref(storage, `images/${username}.${fileExt}`));
        return pictureUrl ? pictureUrl : '';
};

export const uploadPicture = async (username, file) => {
    const fileExt = file.name.split('.').pop().toLowerCase();
    await uploadBytes(ref(storage, `images/${username}.${fileExt}`), file);
    const urlResponse = await getDownloadURL(ref(storage, `images/${username}.${fileExt}`))
    return urlResponse;
};
