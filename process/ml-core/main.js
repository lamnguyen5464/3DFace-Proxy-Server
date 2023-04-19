const args = process.argv;
const { execSync } = require("child_process");

const processId = `${args[2]}`;

const outputPath = `process/ml-core/output/${processId}.obj`;

const placeForInput = `process/ml-core/MICA/demo/input/${processId}.jpeg`;
const placeToStoreOutput = `process/ml-core/MICA/demo/output/${processId}/mesh.obj`;

// execSync(`cp process/ml-core/mock.obj ${outputPath}`).toString();

execSync(
  `cp process/ml-core/input/${processId}.jpeg ${placeForInput}`
).toString();

execSync(`cd process/ml-core/MICA && python3 demo.py`).toString();

execSync(`cp ${placeToStoreOutput} ${outputPath}`).toString();

console.log(outputPath);
