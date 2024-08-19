"use client";

import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
    username: z
        .string()
        .min(2, {
            message: "Username must be at least 2 characters.",
        })
        .max(20, { message: "Username must be less than 20 characters." }),
    message: z.string().min(3, { message: "must be at least 3 character." }),
});

const SendMessage = ({
    onNewMessage,
    yourMessage,
}: {
    onNewMessage: () => void;
    yourMessage: (messageId: string) => void;
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            message: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await axios.post("/api/new-message", values);
            const id = res.data.id;
            onNewMessage();
            yourMessage(id);
            form.reset();
        } catch (error) {
            console.error("their is some problem in your message", error);
        }
    }

    return (
        <>
            <div className='max-w-[390] p-3 '>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 min-w-96"
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-full"
                                            placeholder="Your username"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Please {"don't"} enter your Real Name
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="w-full"
                                            placeholder="Enter your secret message"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This message is gonna be displayed to
                                        all
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" >Done</Button>
                    </form>
                </Form>
            </div>
        </>
    );
};

export default SendMessage;
