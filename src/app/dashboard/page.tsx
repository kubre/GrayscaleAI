"use client";

import { useState } from "react";
import { ScrapeForm } from "./scrapeform";
import { Preview } from "./preview";


export default async function Page() {
    const [data, setData] = useState<{ url: string, data: string }>();

    return (
        <div className="max-w-4xl mx-auto grid pt-16">
            { /* <Button variant="secondary"><UploadIcon className="mr-2 h-4 w-4" /> Upload PDF</Button> */}
            <ScrapeForm setData={setData} />
            <div className="h-4" />
            <Preview state={data} />
        </div>
    );
}
