"use client";

import { Button } from "~/components/ui/button";
import { save } from "~/server/manage-document";
import { Textarea } from "~/components/ui/textarea";

export function DocumentForm({ processedData }: { processedData?: { data: string, source: string } }) {
    if (!processedData) {
        return null
    }

    return <form action={save}>
        <div className="space-y-2 w-full max-w-4xl">
            <h2 className="text-xl font-bold">Scraped Data <small>(Edit and save)</small></h2>
            <input type="hidden" name="url" value={processedData.source} />
            <Textarea name="data" className="h-96 w-full">{processedData.data}</Textarea>
            <div className="flex justify-end">
                <Button type="submit">Save</Button>
            </div>
        </div>
    </form>;
}

