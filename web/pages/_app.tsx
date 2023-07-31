import "../styles/global.scss";
import type { AppProps } from "next/app";
import "../lib/FirebaseApp";
import AuthProvider from "../providers/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
