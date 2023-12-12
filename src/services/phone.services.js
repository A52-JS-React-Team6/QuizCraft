import { get, ref, set } from 'firebase/database';
import { db } from '../config/firebase-config';

export const getPhone = async (phone) => {
    const phoneDocuments = await get(ref(db, `phones/${phone}`));
    return phoneDocuments.val();
};

export const addPhone = async (phone, username) => {
    await set(ref(db, `phones/${phone}`), {
        phone: phone,
        username: username,
        createdOn: new Date()
    });
    const phoneData = await getPhone(phone);
    return phoneData;
}