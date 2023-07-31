import styles from "./InputBox.module.scss";

interface InputBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export default function InputBox({
    label: labelText,
    ...other
}: InputBoxProps) {
    return (
        <div className={styles["input-box-wrapper"]}>
            <label className={styles["label"]}>{labelText}</label>
            <input className={styles["input-box"]} {...other} />
        </div>
    );
}
