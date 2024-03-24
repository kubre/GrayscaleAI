import { DashboardNavigation } from "~/components/DashboardNavigation";
import { SignOutButton } from "~/components/SignOutButton";
import { getServerAuthSession } from "~/server/auth";

export default async function Page() {
    const session = await getServerAuthSession();

    return (
        <>
        </>
    );
}
