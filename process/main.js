const args = process.argv;
const { execSync } = require("child_process");

const processId = `${args[2]}`;

const outputPath = `process/ml-core/output/${processId}.obj`;

execSync(`cp process/ml-core/mock.obj ${outputPath}`).toString();
console.log(outputPath);
