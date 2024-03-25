import { redirect } from "next/navigation";
import { SignInButton } from "~/components/SignInButton";
import { env } from "~/env";
import { getServerAuthSession } from "~/server/auth";

export default async function Page() {
    const session = await getServerAuthSession();

    if (session) {
        console.log("Session exists, redirecting to dashboard");
        redirect("/dashboard");
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                    Introducing <span className="text-[hsl(280,100%,70%)]">{env.NEXT_PUBLIC_APP_NAME}</span>
                </h1>
                <p className="text-xl text-center">{env.NEXT_PUBLIC_APP_DESC}</p>
                <div className="py-4">
                    <SignInButton />
                </div>
            </div>
        </main>
    );
}

