"use server";

import * as cheerio from "cheerio";
import { desc, eq } from "drizzle-orm";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { documents } from "~/server/db/schema";

function cleanHtml(html: string) {
    const $ = cheerio.load(html);
    $("script").remove();
    return $("body").text().split("\n").map(x => x.trim()).filter(Boolean).join(" \n ");
}

export async function getDocuments() {
    const session = await getServerAuthSession();
    if (!session) {
        return {
            status: 401,
            message: "You need to be logged in to view the data",
        }
    }

    const data = await db.query.documents.findMany({
        where: eq(documents.userId, session.user.id),
        orderBy: [desc(documents.createdAt)],
    });
    return {
        status: 200,
        data: data,
    }
}

export async function save(formData: FormData) {
    const session = await getServerAuthSession();
    if (!session) {
        return {
            status: 401,
            message: "You need to be logged in to save the data",
        }
    }

    const data = formData.get("data") as string;
    const url = formData.get("url") as string;
    console.log("Saving data", data, url);
    await db.insert(documents).values({
        id: crypto.randomUUID(),
        content: data,
        source: url,
        userId: session.user.id,
    });
    return {
        status: 200,
        message: "Data saved successfully",
    }
}

export async function scrapeUrl(prevState: any, formData: FormData) {
    const source = formData.get("source") as string;
    if (!source) {
        return {
            source: source,
            message: "Invalid source url",
        }
    }
    try {
        console.log("Scraping the given url", source);
        const res = await fetch(source);
        if (!res.ok) {
            throw new Error("Unable to fetch the given url");
        }
        if (!res.headers.get("content-type")?.startsWith("text/html")) {
            throw new Error("Given URL is not a valid HTML page");
        }
        const htmlStr = await res.text();
        return {
            source: source,
            data: cleanHtml(htmlStr),
        }
    } catch (e) {
        console.error("Unable to scrape the given url", e);
    }
    return {
        source: source,
        message: "Unable to scrape the given url",
    }
}
