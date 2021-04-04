
beforeAll(async () => {
    await page.goto(URL, { waitUntil: "domcontentloaded" });
});

describe('Basics', () => {
    test('Click on Button', async () => {
        // Gets page title
        const title = await page.title();
        // Compares it with the intended behaviour
        expect(title).toBe('Tutorial Environment');

    });
});