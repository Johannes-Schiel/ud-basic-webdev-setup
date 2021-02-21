
beforeAll(async () => {
    await page.goto(URL, { waitUntil: "domcontentloaded" });
});
