"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FaEdit } from "react-icons/fa";
import { SetStateAction, useState } from "react";

const formSchema = z.object({
    message: z.string().min(3, { message: "must be at least 3 character." }),
});

const UpdateMessage = ({
    message,
    onNewMessage,
}: {
    message: { _id: string; username: string; message: string };
    onNewMessage: () => void;
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: message.message,
        },
    });

    // updation function here
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await axios.put(
                `/api/update-message/${message._id}`,
                values
            );

            onNewMessage();
        } catch (error) {
            console.error("their is some problem in your message", error);
        }
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost">
                        <FaEdit size={25} className="text-green-500" />
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Hey! {message.username}</DialogTitle>
                        <DialogDescription>
                            Go ahead and change your message
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8 min-w-96"
                        >
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter your secret message"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            This message is gonna be displayed
                                            to all
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="submit">Done</Button>
                                </DialogClose>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default UpdateMessage;
