import { cookies } from "next/headers";
import { ChatLayout } from "~/components/chat/chat-layout";

export default async function Page() {
    const layout = cookies().get("react-resizable-panels:layout");
    const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

    return (
        <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
    );
}
