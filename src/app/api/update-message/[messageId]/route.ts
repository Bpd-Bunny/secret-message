import Message from "@/model/Message";
import dbConnect from "@/lib/dbConnect";

export async function PUT(
    req: Request,
    { params }: { params: { messageId: string } }
) {
    await dbConnect();
    try {
        const id = params.messageId;

        const {message} = await req.json();
        
        const msg = await Message.findByIdAndUpdate(id, { message });

        if (!msg) {
            return new Response(
                JSON.stringify({ message: "message not found" }),
                { status: 404 }
            );
        }
        return new Response(
            JSON.stringify({ message: "message updated successfully" }),
            { status: 201 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Failed to update message" }),
            { status: 500 }
        );
    }
}
