import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyD20THFX71bpC65YqZ6Hk6xeNvErTs99tU",
    authDomain: "puddl-5b00a.firebaseapp.com",
    projectId: "puddl-5b00a",
    storageBucket: "puddl-5b00a.appspot.com",
    messagingSenderId: "970746563437",
    appId: "1:970746563437:web:9db69fe59554d8a85fa864",
    measurementId: "G-XBHJ61P0TV",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
