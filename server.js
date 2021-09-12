const { default: axios } = require("axios");
var port = process.env.PORT || 8080;
const express = require("express");
const app = express();
var cors = require("cors");

app.use(cors());
app.set('trust proxy', true);

app.get("/*", (req, res) => {
  let parsedParam = "";
  if (typeof req?.params?.["0"] === "string") {
    parsedParam = req.params["0"];
  }
  if (parsedParam === "check/") {
     parsedParam =  req?.ip || req.headers["x-forwarded-for"]?.split(',').shift() || req?.socket?.remoteAddress || "check/";
  }
  console.log("param coming", parsedParam);
  axios
    .get(`http://api.ipstack.com/${parsedParam}`, {
      params: {
        access_key: "96bc7384404d1f6616513ac28fb5f289",
        headers: {},
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
