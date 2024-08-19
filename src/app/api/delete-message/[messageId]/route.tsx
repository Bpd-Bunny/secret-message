import Message from "@/model/Message";
import dbConnect from "@/lib/dbConnect";

export async function DELETE(req: Request,{params}: {params: { messageId: string }}){
    await dbConnect()
    try {
        const id = params.messageId;
        const message = await Message.findByIdAndDelete({_id: id});
        
        if (!message) {
            return new Response(JSON.stringify({ message: 'Message not found' }), { status: 404 });
        }
        return new Response(JSON.stringify({ message: 'Message deleted successfully' }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Failed to delete message' }), { status: 500 });
    }
}