const fs = require("fs");

const args = process.argv;

const facePath = args[2];
const itemsPath = args[3];
const outputFile = args[4];

const startTime = new Date().getTime();

const result = {
  f: [],
  v: [],
  vt: [],
  vn: [],
  push(tag, value) {
    if (this[tag]) {
      this[tag].push(value);
    }
  },
};

fs.readFileSync(facePath, "utf8")
  .split("\n")
  .forEach((line) => {
    const [tag] = line.split(" ") || [];
    result.push(tag, line);
  });

let SCALE_RATIO = null; // = 970;
let TRANSFORM = null; //[-40, 70, -50];

const verticeSum = result.v.length;

const scaler = {
  rootForScale: null,

  scaleSize(points = [], ratio) {
    if (!this.rootForScale) {
      this.rootForScale = points;
      return points;
    }

    return points.map(
      (x, index) =>
        (x - this.rootForScale[index]) * ratio + this.rootForScale[index]
    );
  },

  transform(points = [], delta = []) {
    return points.map((x, index) => x + delta[index]);
  },

  reset() {
    this.rootForScale = null;
  },
};

fs.readFileSync(itemsPath, "utf8")
  .split("\n")
  .map((line) => {
    const items = line.split(" ");
    const [tag, ...rawPoints] = items;

    if (tag === "#SCALE") {
      SCALE_RATIO = Number(rawPoints[0]);
    }
    if (tag === "#TRANSFORM") {
      TRANSFORM = rawPoints.map((item) => Number(item));
    }
    if (tag === "f") {
      const split = line.includes("//") ? "//" : "/";

      const points = rawPoints
        .map((pointString) => pointString.split(split))
        .map((arr) => arr.map((item) => Number(item)))
        .map(([v, vt]) => [v + verticeSum, null])
        .map((arr) => arr.filter((item) => !!item))
        .map((arr) => arr.join(split));

      return [tag, ...points];
    }

    if (tag === "v") {
      const points = rawPoints.map((item) => Number(item));

      // (x1 - x) * RATIO = (x2 - x)
      // =>  (x1 - x) * RATIO + x = x2

      const scaledPoints = scaler.scaleSize(points, SCALE_RATIO);
      const transformedPoints = scaler.transform(scaledPoints, TRANSFORM);

      return [tag, ...transformedPoints];
    }

    return items;
  })
  .map((items) => {
    const [tag] = items;
    const line = items.join(" ");
    result.push(tag, line);
    return line;
  });

const dataToFile = [...result.v, ...result.vt, ...result.f].join("\n");

fs.writeFileSync(outputFile, dataToFile);

console.log(`merged in ${new Date().getTime() - startTime}ms`);
