import styles from "./ChatBubble.module.scss";
import PropTypes from "prop-types";

interface ChatBubbleProps {
    isOther: boolean;
    hasTail: boolean;
    message: string;
}

const ChatBubble = ({ isOther, hasTail, message }: ChatBubbleProps) => {
    return (
        <div
            className={`${styles["chat-bubble"]} ${isOther && styles.other} ${
                hasTail && styles.tail
            }`}
        >
            {message}
        </div>
    );
};

ChatBubble.propTypes = {
    isOther: PropTypes.bool,
    hasTail: PropTypes.bool,
    message: PropTypes.string,
};

ChatBubble.defaultProps = {
    isOther: false,
    hasTail: true,
    message: "",
};

export default ChatBubble;
