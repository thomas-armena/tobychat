import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import InputBox from "../../components/InputBox";
import Logo from "../../components/Logo/Logo";
import styles from "./login.module.scss";
import Router from "next/router";
import {
    signInWithEmailAndPassword,
    getAuth,
    signInWithCredential,
} from "firebase/auth";
import { useUser } from "../../providers/AuthProvider";

const AUTH_ERROR_CODES = {
    INVALID_EMAIL: 'auth/invalid-email',
    USER_NOT_FOUND: 'auth/user-not-found',
    INVALID_PASSWORD: 'auth/invalid-password',
    WRONG_PASSWORD: 'auth/wrong-password',
}

const Login: NextPage = () => {
    const { user } = useUser();
    const [creds, setCreds] = useState({
        email: "",
        password: "",
    });
    const [ errorMessage, setErrorMessage ] = useState("");

    useEffect(() => {
        if (user) {
            Router.push("/chatroom");
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCreds((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async () => {
        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, creds.email, creds.password);
        } catch (error: any) {
            console.error(error);
            switch(error.code) {
                case AUTH_ERROR_CODES.INVALID_EMAIL:
                    setErrorMessage("Invalid email");
                    break;
                case AUTH_ERROR_CODES.USER_NOT_FOUND:
                    setErrorMessage(`No user was found with that email`);
                    break;
                case AUTH_ERROR_CODES.INVALID_PASSWORD:
                    setErrorMessage("Invalid password");
                    break;
                case AUTH_ERROR_CODES.WRONG_PASSWORD:
                    setErrorMessage("Wrong password");
                    break;
                default:
                    setErrorMessage("Server error");
                    break;
            }
        }
    };

    return (
        <div className={styles["login-page"]}>
            <div className={styles["login-form"]}>
                <Logo center />
                <InputBox
                    autoComplete="off"
                    onChange={handleChange}
                    name="email"
                    label="Email"
                    type="text"
                />
                <InputBox
                    autoComplete="off"
                    onChange={handleChange}
                    name="password"
                    type="password"
                    label="Password"
                />
                <Button onClick={handleSubmit}>Login</Button>
                <Button
                    onClick={() => {
                        Router.push("/register");
                    }}
                    secondary
                >
                    Sign up
                </Button>
                {errorMessage && <div className={styles.error}>{errorMessage}</div>}
            </div>
        </div>
    );
};

export default Login;
