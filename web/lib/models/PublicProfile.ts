import { doc, getDoc, getFirestore } from "@firebase/firestore";

export interface PublicProfile {
    displayName: string;
    bio: string;
}

export async function getPublicProfile(uid: string): Promise<PublicProfile> {
    const db = getFirestore();
    const results = await getDoc(doc(db, `drops/${uid}/profiles/public`));
    return results.data() as PublicProfile;
}