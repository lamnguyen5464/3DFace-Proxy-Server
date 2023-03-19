const { createId, saveImage, processImage } = require("./Utils");

const { execSync } = require("child_process");

class ImageHandler {
  handleUpload(req, res) {
    const id = req?.body?.token || createId();

    console.log(`[process ${id}] start...`);

    const base64Image = req.body?.image;

    const base64Data = base64Image?.replace(/^data:image\/jpeg;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const imageName = `${id}.jpeg`;
    const imagePath = `process/ml-core/input/${imageName}`;

    const onSuccess = (outputPath) => {
      return new Promise((resolve, reject) => {
        const options = {
          root: __dirname + "/../process/ml-core/output/", // specify the root directory where the file is located
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
  }

  handleDecor(req, res) {
    const id = req.body?.token;
    const item = req.body?.item;
    console.log(`[deocor ${id}] start with item ${item}...`);

    const outputPath = `./process/ml-core/output/${id}_${item}.obj`;
    const rawFilePath = `./process/ml-core/output/${id}.obj`;
    const itemFilePath = `./process/decorator/obj_files/${item}.obj`;

    execSync(
      `node process/decorator/decor.js ${rawFilePath} ${itemFilePath} ${outputPath}`
    ).toString();

    const options = {
      root: __dirname + "/../process/ml-core/output/", // specify the root directory where the file is located
    };

    res.sendFile(`${id}_${item}.obj`, options, (e) => {});
  }
}

module.exports = new ImageHandler();
