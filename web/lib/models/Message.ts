import {
    addDoc,
    getFirestore,
    collection,
    onSnapshot,
    query,
    orderBy,
    startAfter,
    limitToLast,
} from "@firebase/firestore";
import { useEffect, useState } from "react";

export type MessageData = {
    text: string;
    userId: string;
    createdAt: any;
    type: "text" | "sticker";
};

export type Message = {
    id: string;
    data: MessageData;
};

export function sendMessage(messageData: MessageData) {
    const db = getFirestore();
    addDoc(collection(db, "puddles/0/messages"), messageData);
}

export function useNewMessages() {
    const [messages, setMessages] = useState<Message[]>([]);
    const db = getFirestore();

    useEffect(() => {
        return onSnapshot(
            query(
                collection(db, "puddles/0/messages"),
                orderBy("createdAt", "asc"),
                startAfter(new Date())
            ),
            (snapshot) => {
                setMessages(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data() as MessageData,
                    }))
                );
            }
        );
    }, []);

    return messages;
}
