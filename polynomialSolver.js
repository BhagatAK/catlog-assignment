// Importing filesystem module to read JSON files
const fs = require('fs');

// Function to decode a value from its specified base to decimal
function decodeValue(value, base) {
    return parseInt(value, base);
}

// Function to perform Lagrange interpolation and find the constant term 'c'
function lagrangeInterpolation(points, k) {
    let constantTerm = 0;

    for (let j = 0; j < k; j++) {
        let term = points[j].y;
        for (let i = 0; i < k; i++) {
            if (i !== j) {
                term *= -points[i].x / (points[j].x - points[i].x);
            }
        }
        constantTerm += term;
    }

    return Math.round(constantTerm);
}

// Function to process a test case and calculate the constant term
function solveTestCase(filePath) {
    const rawData = fs.readFileSync(filePath);
    const testCase = JSON.parse(rawData);

    const n = testCase.keys.n;
    const k = testCase.keys.k;
    
    const points = [];

    // Decode and prepare (x, y) points
    Object.keys(testCase).forEach(key => {
        if (key !== 'keys') {
            const x = parseInt(key);
            const base = parseInt(testCase[key].base);
            const y = decodeValue(testCase[key].value, base);
            points.push({ x, y });
        }
    });

    // Use only the first 'k' points for Lagrange interpolation
    const constant = lagrangeInterpolation(points.slice(0, k), k);
    return constant;
}

// Run the solution for both test cases
const result1 = solveTestCase('./testcase1.json');
const result2 = solveTestCase('./testcase2.json');

console.log(`Output for Test Case 1: ${result1}`);
console.log(`Output for Test Case 2: ${result2}`);
