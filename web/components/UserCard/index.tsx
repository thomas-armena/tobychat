import Avatar from "../Avatar";
import styles from "./UserCard.module.scss";

interface UserCardProps {
    name: string;
    tagline: string;
    isUser?: boolean;
}

const UserCard = ({ name, tagline, isUser }: UserCardProps) => {
    let nameToDisplay = name;
    if (isUser) nameToDisplay += " (you)";
    return (
        <div className={styles["user-card"]}>
            <Avatar />
            <div className={styles.details}>
                <div className={styles.name}>{nameToDisplay}</div>
                <div className={styles.tagline}>{tagline}</div>
            </div>
        </div>
    );
};

export default UserCard;
