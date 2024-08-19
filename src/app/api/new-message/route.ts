import dbConnect from "@/lib/dbConnect";
import Message from "@/model/Message";

export async function POST(req: Request) {
    await dbConnect();
    const { username, message} = await req.json();

    try {
        const newMessage = new Message({username, message});
        await newMessage.save();

        return new Response(JSON.stringify({ message: 'Message sent successfully', id: newMessage._id}), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Failed to save message' }), { status: 500 });
    }
}