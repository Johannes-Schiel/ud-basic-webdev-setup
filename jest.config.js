module.exports = {
    coverageReporters: [
        "json", "lcov", "text", "clover"
    ],
    testPathIgnorePatterns: [
        'e2e'
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10
        }
    }
};