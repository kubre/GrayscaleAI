"use server";

import * as cheerio from "cheerio";

function cleanHtml(html: string) {
    const $ = cheerio.load(html);
    $("script").remove();
    return $("body").text().split("\n").map(x => x.trim()).filter(Boolean).join(" \n ");
}

export async function save(formData: FormData) {
    const data = formData.get("data") as string;
    const url = formData.get("url") as string;
    console.log("Saving data", data, url);
    return {
        message: "Data saved successfully",
    }
}

export async function scrapeUrl(prevState: any, formData: FormData) {
    const url = formData.get("url") as string;
    try {
        const res = await fetch("https://books.toscrape.com");
        if (!res.ok) {
            throw new Error("Unable to fetch the given url");
        }
        if (!res.headers.get("content-type")?.startsWith("text/html")) {
            throw new Error("Given URL is not a valid HTML page");
        }
        const htmlStr = await res.text();
        return {
            url: url,
            data: cleanHtml(htmlStr),
        }
    } catch (e) {
        console.error("Unable to scrape the given url", e);
    }
    return {
        url: url,
        message: "Unable to scrape the given url",
    }
}
