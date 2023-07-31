import { NextPage } from "next";
import { useEffect, useState } from "react";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import {
    addDoc,
    collection,
    getFirestore,
    doc,
    onSnapshot,
} from "firebase/firestore";
import { useUser } from "../providers/AuthProvider";

const Michael: NextPage = () => {
    const { user } = useUser();
    const [text, setText] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const [messages, setMessages] = useState<any[]>([]);
    useEffect(() => {
        const db = getFirestore();
        return onSnapshot(collection(db, "puddle/0/messages"), (snapshot) => {
            setMessages(snapshot.docs.map((doc) => doc.data()));
            console.log(messages);
        });
    }, []);

    const handleSendMessage = () => {
        const db = getFirestore();
        addDoc(collection(db, "puddle/0/messages"), {
            message: text,
            timestamp: new Date(),
            userId: user?.uid,
        });
        setText("");
    };

    return (
        <div>
            <p>Message</p>
            <InputBox name="message" onChange={handleChange} />
            <Button onClick={handleSendMessage}>Send</Button>
            <h1>Michael</h1>
            {messages.map((b, ind) => (
                <div key={`ff-${ind}`}>
                    <p>{b.message}</p>
                </div>
            ))}
        </div>
    );
};

export default Michael;
