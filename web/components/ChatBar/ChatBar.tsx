import { useState } from "react";
import IconButton from "../IconButton";
import styles from "./ChatBar.module.scss";
import RenderAvatars from "../../pages/Nick/SendAvatarToChat/avatarSend";

interface ChatBarProps {
    onSend: (message: string) => void;
}

const ChatBar = ({ onSend }: ChatBarProps) => {
    const [text, setText] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleSend = () => {
        onSend(text);
        setText("");
    };

    return (
        <div className={styles["chat-bar"]}>
            <input
                type="text"
                className={styles["text-input"]}
                placeholder="Type message here..."
                onKeyPress={(e) => {
                    if (e.key === "Enter") handleSend();
                }}
                onChange={handleChange}
                value={text}
            ></input>
            <IconButton iconName="send" onPress={handleSend} />
        </div>
    );
};

export default ChatBar;
