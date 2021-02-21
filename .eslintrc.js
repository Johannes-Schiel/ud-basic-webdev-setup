module.exports = {
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 8
    },
    env: {
        jest: true,
    },
    globals: {
        page: true,
        browser: true,
        context: true,
        jestPuppeteer: true
    }
}