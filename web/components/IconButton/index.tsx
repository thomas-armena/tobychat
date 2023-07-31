import styles from "./IconButton.module.scss";

interface IconButtonProps {
    iconName: string;
    onPress: () => void;
}

const IconButton = ({ iconName, onPress }: IconButtonProps) => {
    return (
        <button 
            onClick={onPress}
            className={styles["icon-button"]}>
            <i className="material-icons">{iconName}</i>
        </button>
    );
};

export default IconButton;
