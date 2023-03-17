const { execSync } = require("child_process");

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

app.use(bodyParser.json({ limit: "100mb" }));

const createId = () =>
  `${new Date().getTime()}_${Math.floor(Math.random() * 10000)}`;

const saveImage = (buffer, imagePath) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(imagePath, buffer, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(imagePath);
    });
  });
};

const processImage = (id) => {
  return new Promise((resolve, reject) => {
    try {
      const result = execSync(`node process/main.js ${id}`).toString();
      console.log(result);
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

app.post("/upload-image-base64", (req, res) => {
  const id = createId();

  console.log(`[process ${id}] start...`);

  const base64Image = req.body?.image;

  const base64Data = base64Image.replace(/^data:image\/png;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  const imageName = `${id}.png`;
  const imagePath = `process/ml-core/input/${imageName}`;

  const onSuccess = (outputPath) => {
    return new Promise((resolve, reject) => {
      const options = {
        root: __dirname + "/process/ml-core/output/", // specify the root directory where the file is located
      };

      res.sendFile(`${id}.obj`, options, (e) => {
        if (e) {
          reject(e);
        } else {
          resolve();
        }
      });
    });
  };

  const onFailure = (e) => {
    console.error(`[process ${id}] error: ${e}`);
    res.status(500).send(e?.message);
  };

  Promise.resolve()
    .then(() => saveImage(buffer, imagePath))
    .then(() => processImage(id))
    .then(onSuccess)
    .catch(onFailure);
});

// Start the server
app.listen(3000, () => console.log("Server running on port 3000"));

console.log(execSync(`cd test &&  node parse.js`).toString());
