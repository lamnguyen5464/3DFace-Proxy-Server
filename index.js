const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");
const app = express();
const multer = require("multer");

app.use(bodyParser.json({
  limit: "100mb"
}));

app.post("/upload-image-base64", (req, res) => {
  const base64Image = req.body?.image;

  console.log("base64", base64Image);

  const base64Data = base64Image.replace(/^data:image\/png;base64,/, "");

  const buffer = Buffer.from(base64Data, 'base64');

  fs.writeFile('image.png', buffer, (err) => {
    if (err) {
      console.error(err)
      res.status(500).send(err)
      return;
    }
    res.status(200).send("OKKKKK");
    console.log('The file has been saved!');
  });

});


// Start the server
app.listen(3000, () => console.log("Server running on port 3000"));
