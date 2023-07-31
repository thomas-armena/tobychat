import { NextPage } from "next";
import styles from "./chatroom.module.scss";
import Logo from "../../components/Logo/Logo";
import ChatBar from "../../components/ChatBar/ChatBar";
import Button from "../../components/Button";
import { useCallback, useEffect, useRef, useState } from "react";
import { useUser } from "../../providers/AuthProvider";
import Router from "next/router";
import { getAuth, signOut } from "@firebase/auth";
import ChatBubbleGroup from "../../components/ChatBubbleGroup";
import { Message, useNewMessages, sendMessage } from "../../lib/models/Message";
import UserCard from "../../components/UserCard";
import Divider from "../../components/Divider";
import MenuIconButton from "../../components/MenuIconButton";
import { randomString } from "../../lib/utils/randomString";
import IconButton from "../../components/IconButton";
import { getPublicProfile, PublicProfile } from "../../lib/models/PublicProfile";

const Chatroom: NextPage = () => {
    const { user, status } = useUser();
    const newMessages = useNewMessages();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [ userProfile, setUserProfile ] = useState<PublicProfile | null>(null);
    const [ chatroomUserProfiles , setChatRoomUserProfiles ] = useState<{ [key:string]: PublicProfile }>({});

    const chatPreviewRef = useCallback(
        (node) => {
            if (node) {
                node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
            }
        },
        [newMessages]
    );

    useEffect(() => {
        console.log(user);
        if (!user && status == "done") {
            Router.push("/login");
        }
    }, [user, status]);

    useEffect(() => {
        const getUserProfile = async () => {
            if (user === null) return;
            const newUserProfile = await getPublicProfile(user.uid);
            setUserProfile(newUserProfile);
        }
        getUserProfile();
    }, [user])

    // TODO: This is just a temporary way to get user profiles
    useEffect(() => {

        const getUUIDsFromMessages = (messages: Message[]) => {
            let uuidMap: {[key:string]: boolean} = {};
            for (const message of messages) {
                uuidMap[message.data.userId] = true;
            }
            return Object.keys(uuidMap);
        }

        const getProfiles = async () => {
            const uuids = getUUIDsFromMessages(newMessages);
            let newUserProfiles: { [key:string]: PublicProfile } = {};
            for (const uuid of uuids) {
                const profile = await getPublicProfile(uuid);
                newUserProfiles[uuid] = profile;
            }
            setChatRoomUserProfiles(newUserProfiles);
        }
        getProfiles();
        
    }, [newMessages])

    const groupMessages = (messages: Message[]): Message[][] => {
        const grouped: Message[][] = [];
        let currentGroup: Message[] = [];
        for (let i = 0; i < messages.length; i++) {
            if (
                i > 0 &&
                messages[i].data.userId !== messages[i - 1].data.userId
            ) {
                grouped.push(currentGroup);
                currentGroup = [];
            }
            currentGroup.push(messages[i]);
        }
        grouped.push(currentGroup);
        return grouped;
    };

    const handleSubmit = (text: string) => {
        if (text.length > 0 && user?.uid) {
            sendMessage({
                text,
                userId: user?.uid,
                createdAt: new Date(),
                type: "text",
            });
        }
    };

    const renderLeftBar = () => {

        const uuidsAsideFromUser = user && Object.keys(chatroomUserProfiles).filter((uuid) => uuid !== user.uid);
        const profilesAsideFromUser = uuidsAsideFromUser?.map((uuid) => chatroomUserProfiles[uuid]);
        return (
            <div className={styles.leftbar}>
                {renderMenuHeader()}
                {userProfile && <>
                    <UserCard name={userProfile.displayName} tagline={userProfile.bio} isUser/>
                    <Divider />
                </>}
                {profilesAsideFromUser && profilesAsideFromUser
                    .map((profile) => {
                        return <>
                            <UserCard name={profile.displayName} tagline={profile.bio} />
                            <Divider />
                        </>
                    })}
            </div>
        );
    };

    const renderMenuHeader = () => {
        const menuOptions = ["Leave Chat", "Sign Out"];

        const handleMenuSelect = (index: number) => {
            if (index === 1) {
                const auth = getAuth();
                signOut(auth);
            }
        };

        return (
            <div className={styles["menu-header"]}>
                <h1>Chat</h1>
                <div style={{ flex: 1 }} />
                <MenuIconButton
                    options={menuOptions}
                    onSelect={handleMenuSelect}
                />
            </div>
        );
    };

    const renderTopBar = () => {
        return (
            <div className={styles.topbar}>
                <Logo />
                <div style={{ flex: 1 }} />
                <div className={styles["menu-button"]}>
                    <IconButton
                        iconName={mobileMenuOpen ? "message" : "menu"}
                        onPress={() => {
                            setMobileMenuOpen(!mobileMenuOpen);
                        }}
                    />
                </div>
            </div>
        );
    };

    const renderChat = () => {
        return (
            <div className={styles.chat}>
                {renderChatPreview()}
                {renderChatControl()}
            </div>
        );
    };

    const renderChatPreview = () => {
        const groupedMessages = groupMessages(newMessages);

        return (
            <div className={styles["chat-preview"]} ref={chatPreviewRef}>
                {groupedMessages.map(renderMessageGroup)}
            </div>
        );
    };

    const renderMessageGroup = (messages: Message[]) => {
        if (!messages || messages.length <= 0) return null;
        const userId = messages[0].data.userId
        const isOther = userId !== user?.uid;
        return (
            <ChatBubbleGroup
                key={`${user?.uid}__${randomString(4)}`}
                isOther={isOther}
                messages={messages}
                displayName={chatroomUserProfiles[userId]?.displayName || userId}
            />
        );
    };

    const renderChatControl = () => {
        return (
            <div className={styles["chat-control"]}>
                <ChatBar onSend={handleSubmit} />
            </div>
        );
    };

    const renderDesktopLayout = () => {
        return (
            <div className={styles.desktop}>
                {renderLeftBar()}

                <div className={styles["middle-section"]}>
                    {renderTopBar()}
                    {renderChat()}
                </div>
            </div>
        );
    };

    const renderMobileLayout = () => {
        return (
            <div className={styles.mobile}>
                {renderTopBar()}
                {mobileMenuOpen ? renderLeftBar() : renderChat()}
            </div>
        );
    };

    if (!user && status === "loading") return <div></div>;
    return (
        <div>
            {renderDesktopLayout()}
            {renderMobileLayout()}
        </div>
    );
};

export default Chatroom;
