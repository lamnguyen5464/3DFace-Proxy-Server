const args = process.argv;
const { execSync } = require("child_process");

const processId = `${args[2]}`;

const outputPath = `process/ml-core/output/${processId}.obj`;

const placeForInput = `process/ml-core/MICA/demo/input/${processId}.jpg`;
const placeToStoreOutput = `process/ml-core/MICA/demo/output/${processId}/mesh.obj`;

console.log = () => null;

// execSync(`cp process/ml-core/mock.obj ${outputPath}`).toString();
try {
  console.log("Haergae");
  execSync(`mkdir process/ml-core/input`);
  execSync(`mkdir process/ml-core/output`);
  execSync(`mkdir process/ml-core/MICA/demo`);
  execSync(`mkdir process/ml-core/MICA/demo/input`);
  execSync(`mkdir process/ml-core/MICA/demo/output`);
} catch (e) {}
execSync(`echo here`);

console.log(
  execSync(
    `mv process/ml-core/input/${processId}.jpg ${placeForInput}`
  ).toString()
);

console.log(execSync(`cd process/ml-core/MICA && python demo.py`).toString());

console.log(execSync(`mv ${placeToStoreOutput} ${outputPath}`).toString());
console.log(execSync(`rm ${placeForInput}`).toString());
