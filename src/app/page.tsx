"use client";

import SendMessage from "@/components/SendMessage";
import axios from "axios";
import { useEffect, useState } from "react";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import MessageCard from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import UpdateMessage from "@/components/UpdateMessage";
import { cn } from "@/lib/utils";

interface Message {
    _id: string;
    username: string;
    message: string;
    updatedAt: string;
}

export default function Home() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [yourMessageId, setYourMessageId] = useState<string[]>([]);
    const [buttonActive, setButtonActive] = useState(false);

    const getMessages = 
        async () => {
            console.log('getmessage')
            try {
                const res = await axios.get("api/get-messages");
                setMessages(res.data);
            } catch (error) {}
            setButtonActive(false);
        };

    const deleteMessage = async (messageId: string) => {
        setButtonActive(true);
        try {
            const res = await axios.delete(`api/delete-message/${messageId}`);
            getMessages();
            deleteItemByValue(messageId);
        } catch (error) {
            console.log("error in deleting message", error);
        }
    };

    const yourMessage = (messageId: string) => {
        const updatedIds: string[] = [...yourMessageId, messageId];
        localStorage.setItem("messageIds", JSON.stringify(updatedIds));
        setYourMessageId(updatedIds);
    };

    const deleteItemByValue = (value: string) => {
        const messageIds = JSON.parse(
            localStorage.getItem("messageIds") || "[]"
        );
        const updatedIds = messageIds.filter((id: string) => id !== value);
        localStorage.setItem("messageIds", JSON.stringify(updatedIds));
        setYourMessageId(updatedIds);
    };

    useEffect(() => {
        getMessages();
        const ids = JSON.parse(localStorage.getItem("messageIds")!) || [];
        setYourMessageId(ids);
    }, []);

    return (
        <>
            <div className="flex justify-center items-center">
                <SendMessage
                    onNewMessage={getMessages}
                    yourMessage={yourMessage}
                />
            </div>
            <div className="flex flex-wrap justify-stretch items-center">
                {!messages.length && <p>Loading...</p>}

                {messages.map((message) => (
                    <div key={message._id}>
                        <HoverCard openDelay={400}>
                            <HoverCardTrigger>
                                <MessageCard
                                    message={message}
                                    verified={yourMessageId.includes(
                                        message._id
                                    )}
                                />
                            </HoverCardTrigger>
                            <HoverCardContent
                                className={cn(
                                    "w-56 justify-between p-0.5 border-none ",
                                    yourMessageId.includes(message._id)
                                        ? "flex"
                                        : "hidden"
                                )}
                                sideOffset={-10}
                            >
                                <Button
                                    variant="ghost"
                                    onClick={() => deleteMessage(message._id)}
                                    disabled={buttonActive}
                                >
                                    <MdDelete
                                        size={25}
                                        className="text-red-500"
                                    />
                                </Button>
                                <UpdateMessage
                                    message={message}
                                    onNewMessage={getMessages}
                                />
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                ))}
            </div>
        </>
    );
}
