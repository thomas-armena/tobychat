import { Message } from "../../lib/models/Message";
import Avatar from "../Avatar";
import ChatBubble from "../ChatBubble";
import styles from "./ChatBubbleGroup.module.scss";

interface ChatBubbleGroupProps {
    messages: Message[];
    isOther: boolean;
    displayName: string;
}

const ChatBubbleGroup = ({ messages, isOther, displayName }: ChatBubbleGroupProps) => {
    if (!messages || messages.length <= 0) return null;

    const renderMessage = (message: Message, index: number) => {
        const isLastIndex = index >= messages.length - 1;
        return (
            <ChatBubble
                key={message.id}
                message={message.data.text}
                hasTail={isLastIndex}
                isOther={isOther}
            />
        );
    };

    const time: Date = messages[messages.length-1].data.createdAt.toDate();
    console.log(time);
    return (
        <div className={styles.row}>
            {isOther && (
                <div className={`${styles.avatar} ${styles.other}`}>
                    <Avatar small />
                </div>
            )}
            <div className={styles.col}>
                {isOther && <div className={styles.name}>{displayName}</div>}
                {messages.map(renderMessage)}
                <div className={`${styles.time} ${isOther && styles.other}`}>{time.toLocaleTimeString()}</div>
            </div>
            {!isOther && (
                <div className={styles.avatar}>
                    <Avatar small reversed />
                </div>
            )}
        </div>
    );
};

export default ChatBubbleGroup;
