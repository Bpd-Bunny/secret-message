'use client'
import { memo } from 'react';
import { cn } from "@/lib/utils";
import { MdVerified } from "react-icons/md";
const MessageCard = ({
    message,
    verified,
}: {
    message: { message: string; username: string; updatedAt: string };
    verified: boolean;
}) => {
    console.log('message card render!')
    return (
        <div className="h-56 w-[390px] sm:w-80 border rounded-lg mx-3 my-3 p-3 bg-white dark:bg-gray-800 shadow-md relative">
            <div className="flex justify-between items-center bg-red-50 dark:bg-gray-700 font-bold p-2 rounded-t-lg ">
                <p className="text-black dark:text-white ">{message.username}</p>
                <div className="flex items-center" >
                    <span className={cn(verified ? "text-green-500" : "hidden")}><MdVerified /></span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(message.updatedAt).toLocaleDateString(
                            "en-IN",
                            {
                                day: "2-digit",
                                month: "2-digit",
                            }
                        )}{" "}
                    </p>
                </div>
            </div>
            <div className="mt-2 text-gray-800 dark:text-gray-200 overflow-y-auto h-36">
                {message.message}
            </div>
            <div className="absolute bottom-0 right-1 text-sm text-gray-500 dark:text-gray-400">
                {new Date(message.updatedAt).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </div>
        </div>
    );
};

export default memo(MessageCard);
