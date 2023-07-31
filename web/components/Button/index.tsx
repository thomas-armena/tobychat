import styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    secondary?: boolean;
}

export default function Button({ children, secondary, ...other }: ButtonProps) {
    return (
        <button
            {...other}
            className={`${styles["button"]} ${
                secondary && styles["secondary"]
            }`}
        >
            {children}
        </button>
    );
}
