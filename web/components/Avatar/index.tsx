import styles from "./Avatar.module.scss";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/open-peeps";

interface AvatarProps {
    small?: boolean;
    reversed?: boolean;
}

const Avatar = ({ small, reversed }: AvatarProps) => {
    let svg = createAvatar(style, {
        seed: "custom-seed",
        dataUri: true,
    });

    return (
        <div className={`${styles.avatar} ${small && styles.small} ${reversed && styles.reversed}`}>
            <img src={svg} alt="avatar"/>
        </div>
    );
};

Avatar.defaultProps = {
    small: false,
};

export default Avatar;
