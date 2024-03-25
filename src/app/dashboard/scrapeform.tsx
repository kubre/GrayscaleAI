"use client";

import { RocketIcon } from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useFormState } from "react-dom";
import { scrapeUrl } from "./actions";
import { useEffect } from "react";

const initialState = {
    url: "",
    data: "",
};


export function ScrapeForm({ setData }: { setData: React.Dispatch<React.SetStateAction<any>> }) {
    const [state, formAction] = useFormState(scrapeUrl, initialState);

    if (state.data) {
        console.log(state.data);
        setData(state);
    }

    return <form method="POST" action={formAction}>
        <div className="flex w-full items-center space-x-2">
            <Input placeholder="Enter URL" />
            <Button variant="secondary" type="submit"><RocketIcon className="mr-2 h-4 w-4" /> Fetch</Button>
        </div>
    </form>;
}
