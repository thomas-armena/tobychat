import styles from "./avatarSend.module.scss";
import Button from "../../../components/Button";
import IconButton from "../../../components/IconButton";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/open-peeps";
import { useEffect, useState } from "react";
import openPeepsCharacterData from "../../../lib/avatar/openPeepsData";

import { getFirestore, addDoc, collection } from "@firebase/firestore";
import Image from "next/image";

const RenderAvatars = () => {
    const [viewExpressionMenu, setViewExpressionMenu] = useState(false);
    const [characterOptionsSelected, setCharacterOptionsSelected] = useState({
        //FIRE BASE JSON DATA PULLED HERE
        seed: "custom-seed",
        dataUri: true,
        head: ["afro"],
        face: ["angryWithFang"],
        facialHair: ["chin"],
        facialHairProbability: 0,
        masks: ["medicalMask"],
        maskProbability: 0,
        accessories: ["eyepatch"],
        accessoriesProbability: 0,
        skinColor: ["variant01"],
        clothingColor: ["red01"],
        hairColor: ["variant01"],
        flip: true,
    });

    const renderOptions = (features) => {
        const facialExpressions = [];
        const newCharacterOptionsSelected = { ...characterOptionsSelected };
        Object.keys(features).map((feature) =>
            facialExpressions.push({
                ...newCharacterOptionsSelected,
                face: [feature],
            })
        );
        return facialExpressions;
    };

    const handleSendSticker = (sticker) => {
        const db = getFirestore();
        addDoc(collection(db, "puddle/nickdebug/messages"), {
            message: sticker,
            timestamp: new Date(),
            // userId: user?.uid,
        });
    };

    const generateFaces = () => {
        const allFacialExpressions = renderOptions(
            openPeepsCharacterData.faceOptions
        );
        return allFacialExpressions.map((avatar) => {
            const svg = createAvatar(style, avatar);
            console.log(avatar);
            return (
                <Image
                    onClick={(e) => {
                        handleSendSticker(e.target.src);
                    }}
                    className={styles.facialExpression}
                    width="20%"
                    height="20%"
                    key={avatar.face}
                    src={svg}
                />
            );
        });
    };

    const toggleExpressionsMenu = () => {
        viewExpressionMenu
            ? setViewExpressionMenu(false)
            : setViewExpressionMenu(true);
    };

    if (!characterOptionsSelected) {
        return <div>ERROR</div>;
    }

    return (
        <div className={styles.expressionMenuComponent}>
            <div className={styles.facialExpressions}>
                {" "}
                {viewExpressionMenu && generateFaces()}
            </div>
            <IconButton
                iconName="more_horiz"
                onPress={() => {
                    toggleExpressionsMenu();
                }}
            >
                Stickers
            </IconButton>
        </div>
    );
};

export default RenderAvatars;
