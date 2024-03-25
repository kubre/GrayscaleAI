"use client";

import { useState } from "react";

import { ScrapeForm } from "./webscrape-form";
import { DocumentForm } from "./document-form";


export function ImportData() {
    const [data, setData] = useState<{ source: string, data: string }>();

    return <>
        <ScrapeForm setData={setData} />
        <div className="h-4" />
        <DocumentForm processedData={data} />
    </>
}
