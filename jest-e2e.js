module.exports = {
    preset: 'jest-puppeteer',
    globals: {
        URL: 'http://localhost:3000'
    },
    testMatch: [
        '**/e2e/**/*.test.js'
    ],
    testPathIgnorePatterns: [
        'src'
    ],
}