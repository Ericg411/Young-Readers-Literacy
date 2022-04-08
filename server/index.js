const express = require("express");
const next = require("next");
const cors = require("cors");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const port = 3000;

nextApp.prepare().then(() => {
  const app = express();

  // enables cross origin requests
  app.use(cors());

  //allows us to understand json
  app.use(express.json());

  app.get("/my-custom-route", (req, res) =>
    res.status(200).send({ hello: "Hello, from the back-end world!" })
  );

  app.get("*", (req, res) => {
    return handle(req, res);
  });

  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on localhost:${port}`);
  });
});
