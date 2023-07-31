import styles from "./nick.module.scss";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/open-peeps";
import { useEffect, useState } from "react";
import openPeepsCharacterData from "../../lib/avatar/openPeepsData";
import Image from "next/image";

const Nick = () => {
    const [characterOptionsSelected, setCharacterOptionsSelected] = useState({
        head: "afro",
        face: "angryWithFang",
        facialHair: "chin",
        facialHairProbability: 100,
        masks: "medicalMask",
        maskProbability: 0,
        accessories: "eyepatch",
        accessoriesProbability: 0,
        skinColor: "variant01",
        clothingColor: "red01",
        hairColor: "variant01",
    });

    useEffect(() => {
        console.log(characterOptionsSelected);
        console.log(svg);
    }, [characterOptionsSelected]);

    let svg = createAvatar(style, {
        seed: "custom-seed",
        dataUri: true,
        head: [characterOptionsSelected.head],
        face: [characterOptionsSelected.face],
        facialHair: [characterOptionsSelected.facialHair],
        facialHairProbability: [characterOptionsSelected.facialHairProbability],
        maskProbability: [characterOptionsSelected.maskProbability],
        masks: [characterOptionsSelected.masks],
        accessories: [characterOptionsSelected.accessories],
        accessoriesProbability: [
            characterOptionsSelected.accessoriesProbability,
        ],
        skinColor: [characterOptionsSelected.skinColor],
        clothingColor: [characterOptionsSelected.clothingColor],
        hairColor: [characterOptionsSelected.hairColor],
    });

    const createCharacter = (characterProperty, choiceMade) => {
        const currentCharacterModel = {
            ...characterOptionsSelected,
            [characterProperty]: choiceMade,
        };
        setCharacterOptionsSelected(currentCharacterModel);
    };

    const renderOptions = (features) =>
        Object.keys(features).map((feature) => (
            <option key={feature} value={feature}>
                {features[feature]}
            </option>
        ));

    const sendCharacterData = () => {
        //IMG
        console.log(svg);
        //OBJ Needed for avatar send Component
        console.log(characterOptionsSelected);
    };

    return (
        <div className={styles.profileImgScreen}>
            <Image src={svg} width="100" height="100" alt="Your avatar" />

            {/* HEAD SELECTION */}

            <div className={styles.characterOptionDiv}>
                <label htmlFor="head selection">Head:</label>
                <select
                    id="head selection"
                    onChange={(e) => {
                        createCharacter("head", e.target.value);
                    }}
                >
                    {renderOptions(openPeepsCharacterData.headOptions)}
                </select>
            </div>

            <div className={styles.characterOptionDiv}>
                <label htmlFor="face selection">Face:</label>
                <select
                    id="face selection"
                    onChange={(e) => {
                        createCharacter("face", e.target.value);
                    }}
                >
                    {renderOptions(openPeepsCharacterData.faceOptions)}
                </select>
            </div>

            <div className={styles.characterOptionDiv}>
                <label htmlFor="facial hair selection">Facail Hair:</label>
                <select
                    id="facial hair selection"
                    onChange={(e) => {
                        createCharacter("facialHair", e.target.value);
                    }}
                >
                    {renderOptions(openPeepsCharacterData.facialHairOptions)}
                </select>
                <input
                    type="checkbox"
                    onChange={(e) => {
                        if (e.target.checked === true) {
                            createCharacter("facialHairProbability", 100);
                        } else {
                            createCharacter("facialHairProbability", 0);
                        }
                    }}
                ></input>
            </div>

            <div className={styles.characterOptionDiv}>
                <label htmlFor="masks selection">Masks:</label>
                <select
                    id="masks selection"
                    onChange={(e) => {
                        createCharacter("masks", e.target.value);
                    }}
                >
                    {renderOptions(openPeepsCharacterData.maskOptions)}
                </select>
                <input
                    type="checkbox"
                    onChange={(e) => {
                        if (e.target.checked === true) {
                            createCharacter("maskProbability", 100);
                        } else {
                            createCharacter("maskProbability", 0);
                        }
                    }}
                ></input>
            </div>

            <div className={styles.characterOptionDiv}>
                <label htmlFor="accessories selection">Accessories:</label>
                <select
                    id="accessories selection"
                    onChange={(e) => {
                        createCharacter("accessories", e.target.value);
                    }}
                >
                    {renderOptions(openPeepsCharacterData.accessories)}
                </select>
                <input
                    type="checkbox"
                    onChange={(e) => {
                        if (e.target.checked === true) {
                            createCharacter("accessoriesProbability", 100);
                        } else {
                            createCharacter("accessoriesProbability", 0);
                        }
                    }}
                ></input>
            </div>

            <div className={styles.characterOptionDiv}>
                <label htmlFor="skin color selection">Skin Color:</label>
                <select
                    id="skin color selection"
                    onChange={(e) => {
                        createCharacter("skinColor", e.target.value);
                    }}
                >
                    {renderOptions(openPeepsCharacterData.skinColor)}
                </select>
            </div>

            <div className={styles.characterOptionDiv}>
                <label htmlFor="clothing color selection">
                    Clothing Color:
                </label>
                <select
                    id="clothing color selection"
                    onChange={(e) => {
                        createCharacter("clothingColor", e.target.value);
                    }}
                >
                    {renderOptions(openPeepsCharacterData.clothingColor)}
                </select>
            </div>

            <div className={styles.characterOptionDiv}>
                <label htmlFor="hair color selection">Hair Color:</label>
                <select
                    id="hair color selection"
                    onChange={(e) => {
                        createCharacter("hairColor", e.target.value);
                    }}
                >
                    {renderOptions(openPeepsCharacterData.hairColor)}
                </select>
            </div>

            <div>
                <button
                    onClick={() => {
                        sendCharacterData();
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Nick;
