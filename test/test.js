const { createId, processImage, saveImage } = require("../src/Utils");
const { execSync } = require("child_process");
const fs = require("fs");

let base64Image;
let id;

beforeEach(() => {
  base64Image = fs.readFileSync("./img_base64.txt", "base64");
  id = createId();
});

describe("Happy cases of utils", () => {
  test("create id not null", () => {
    expect(!!id).toBe(true);
  });

  test("create id not empty", () => {
    expect(id !== "").toBe(true);
  });
});

describe("Image", () => {
  test("save image", () => {
    const base64Data = base64Image?.replace(/^data:image\/jpeg;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    const imageName = `${id}.jpg`;
    const imagePath = `process/ml-core/input/${imageName}`;
    saveImage(buffer, imagePath).then((res) => {
      expect(res).toBeTruthy();
    });
  });

  test("save 2 image current", () => {
    [1, 2].forEach((id) => {
      const base64Data = base64Image?.replace(/^data:image\/jpeg;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      const imageName = `${id}.jpg`;
      const imagePath = `process/ml-core/input/${imageName}`;
      saveImage(buffer, imagePath).then((res) => {
        expect(res).toBeTruthy();
      });
    });
  });

  test("save 5 image current", () => {
    [1, 2, 3, 4, 5].forEach((id) => {
      const base64Data = base64Image?.replace(/^data:image\/jpeg;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      const imageName = `${id}.jpg`;
      const imagePath = `process/ml-core/input/${imageName}`;
      saveImage(buffer, imagePath).then((res) => {
        expect(res).toBeTruthy();
      });
    });
  });
});
