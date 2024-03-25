import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { DashboardProfileNavigation } from "~/components/DashboardNavigation";
import { ThemeProvider } from "~/components/ThemeProvider";
import { env } from "~/env";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata = {
    title: "Summarizer",
    description: "AI powered agent on all of your knowledge",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerAuthSession();

    if (!session) {
        console.log("No session exists, redirecting to login");
        redirect("/");
    }

    return (
        <html lang="en">
            <body className={`font-sans ${inter.variable} min-h-screen`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <nav className="flex justify-between items-center sticky px-8 py-2 w-full border-b border-slate-800/80">
                        <h1 className="text-xl font-bold">{env.NEXT_PUBLIC_APP_NAME}</h1>
                        <DashboardProfileNavigation user={session.user} />
                    </nav>
                    <main className="min-h-[calc(100vh-58px)]">
                        {children}
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
