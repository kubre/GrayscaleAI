"use client";

export function Preview({ state }: { state?: { data: string, url: string } }) {
    if (!state) {
        return null
    }

    return <div className="space-y-2 w-full max-w-4xl">
        <h2 className="text-xl font-bold">Scraped Data <small>(Edit and save)</small></h2>
        <textarea className="h-96 w-full overflow-x-auto overflow-y-auto border-slate-800/80 bg-slate-900 p-2 rounded">{state.data}</textarea>
    </div>;
}

