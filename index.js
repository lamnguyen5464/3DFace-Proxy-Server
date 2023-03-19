const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const imageHandler = require("./src/ImageHandler");
const { createId } = require("./src/Utils");

app.use(bodyParser.json({ limit: "100mb" }));
app.post("/token", (req, res) => {
  const id = createId();
  res.status(200).send(id);
});
app.post("/upload-image-base64", imageHandler.handleUpload);

app.post("/decor", imageHandler.handleDecor);

// Start the server
app.listen(3000, () => console.log("Server running on port 3000"));
