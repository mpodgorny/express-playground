const { default: axios } = require("axios");
const express = require("express");
const app = express();
const port = 5000;

app.get("/*", (req, res) => {
  let parsedParam = "";
  if (typeof req?.params?.["0"] === "string") {
    parsedParam = req.params["0"];
  }
  axios
    .get(`http://api.ipstack.com/${parsedParam}`, {
      params: {
        access_key: "96bc7384404d1f6616513ac28fb5f289",
      },
    })
    .then(({ data }) => {
      res.send(data);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
