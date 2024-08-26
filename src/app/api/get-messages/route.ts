import dbConnect from "@/lib/dbConnect";
import Message from "@/model/Message";

export async function GET(req: Request) {
    await dbConnect();
    // const dbres = 
    // if (dbres!=='connect'){
    //     return new Response(
    //         JSON.stringify({ message: "Failed to connect to database" }),
    //         { status: 500 }
    //     );
    // }
    // let messages = [];

    try {
        const messages = await Message.find().sort({ updatedAt: -1 });
        return new Response(JSON.stringify(messages), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Failed to fetch messages" }),
            { status: 500 }
        );
    }
}
