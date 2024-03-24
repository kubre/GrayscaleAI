import { SignOutButton } from "~/components/SignOutButton";
import { getServerAuthSession } from "~/server/auth";

export default async function Page() {
    const session = await getServerAuthSession();

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <p> You're logged in as {session?.user?.email} </p>
            <div className="py-4">
                <SignOutButton />
            </div>
        </main>
    );
}
