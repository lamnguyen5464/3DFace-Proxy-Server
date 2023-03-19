const fs = require("fs");
const { execSync } = require("child_process");

module.exports = {
  createId: () =>
    `${new Date().getTime()}_${Math.floor(Math.random() * 10000)}`,

  saveImage: (buffer, imagePath) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(imagePath, buffer, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(imagePath);
      });
    });
  },

  processImage: (id) => {
    return new Promise((resolve, reject) => {
      try {
        const result = execSync(
          `node process/ml-core/main.js ${id}`
        ).toString();
        console.log(result);
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  },
};
