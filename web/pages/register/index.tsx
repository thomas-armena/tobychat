import Logo from "../../components/Logo/Logo";
import { NextPage } from "next";
import styles from "./register.module.scss";
import InputBox from "../../components/InputBox";
import Button from "../../components/Button";
import { useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import Router from "next/router";

const Register: NextPage = () => {
    const [info, setInfo] = useState({
        email: "",
        password: "",
        displayName: "",
        bio: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const functions = getFunctions();
        const register = httpsCallable(functions, "register2");
        register(info).then((res: any) => {
            console.log(res.data);
            if (res.data.success) {
                Router.push("/login");
            }
        });
    };

    return (
        <div className={styles["register-page"]}>
            <div className={styles["register-form"]}>
                <Logo center />
                <p>
                    Welcome to Toby Chat! we&apos;re happy to have you!
                    We&apos;ll need some information about you to get started!
                </p>
                <div className={styles["register-form-inputs"]}>
                    <InputBox
                        onChange={handleChange}
                        label="Email"
                        name="email"
                    />
                    <InputBox
                        onChange={handleChange}
                        label="Password"
                        name="password"
                    />
                    <InputBox
                        onChange={handleChange}
                        label="Display Name"
                        name="displayName"
                    />
                    <InputBox onChange={handleChange} label="Bio" name="bio" />
                    <Button onClick={handleSubmit}>Sign Up </Button>
                    <Button
                        onClick={() => {
                            Router.push("/login");
                        }}
                        secondary
                    >
                        Back
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Register;
