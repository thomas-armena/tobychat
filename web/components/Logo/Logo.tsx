import styles from "./Logo.module.scss";
import DripSVG from "./drip.svg";
import PropTypes from "react";

interface LogoProps {
    center?: boolean;
}

const Logo = ({ center }: LogoProps) => {
    return (
        <div className={`${styles["logo"]} ${center && styles["center"]}`}>
            <h1>Toby Chat</h1>
        </div>
    );
};

export default Logo;
