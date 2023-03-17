const fs = require("fs");

const startTime = new Date().getTime();

const outputFile = "./obj_files/test.obj";

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

const faceFile = fs
  .readFileSync("./obj_files/face0.obj", "utf8")
  .split("\n")
  .forEach((line) => {
    const [tag] = line.split(" ") || [];
    result.push(tag, line);
  });

// fs.writeFileSync(outputFile, face.join("\n") + "\n");

const SCALE_RATIO = 1100;
const DELTA = [90, 60, 90];

const verticeSum = result.v.length;

const scaler = {
  rootForSize: null,

  scaleSize(points = [], ratio) {
    if (!this.rootForSize) {
      this.rootForSize = points;
      return points;
    }

    return points.map(
      (x, index) =>
        (x - this.rootForSize[index]) * ratio + this.rootForSize[index]
    );
  },

  transform(points = [], delta = []) {
    return points.map((x, index) => x + delta[index]);
  },

  reset() {
    this.rootForSize = null;
  },
};

const hair = fs
  .readFileSync("./obj_files/hair_female_2.obj", "utf8")
  .split("\n")
  .map((line) => {
    const items = line.split(" ");
    const [tag, ...rawPoints] = items;
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
      const transformedPoints = scaler.transform(scaledPoints, DELTA);

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
