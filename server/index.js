require("dotenv").config();

const express = require("express");
const axios = require("axios");
const qs = require("querystring");

const app = express();
const port = 4545;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/auth", async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) throw Error("Auth failed");

    const authData = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "authorization_code",
      code: code
    };

    const { data } = await axios.post(
      "https://freesound.org/apiv2/oauth2/access_token/",
      qs.stringify(authData)
    );

    res.redirect(`${process.env.BASE_URL}?${qs.stringify(data)}`);
  } catch (err) {
    console.log(err);
    res.redirect(`${process.env.BASE_URL}?error=1`);
  }
});

app.get("/refresh", async (req, res) => {
  try {
    const { refresh_token } = req.query;
    const authData = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token
    };
    const { data } = await axios.post(
      "https://freesound.org/apiv2/oauth2/access_token/",
      qs.stringify(authData)
    );
    res.json(data);
  } catch (err) {
    if (err && err.response) {
      res.sendStatus(err.response.status);
    } else {
      res.sendStatus(500);
    }
  }
});

app.get("/search", async (req, res) => {
  const { query, fields } = req.query;
  const authHeader = req.header("Authorization");

  try {
    const { data } = await axios.get(
      "https://freesound.org/apiv2/search/text/",
      {
        params: {
          query,
          fields,
          ...(!authHeader ? { token: process.env.CLIENT_SECRET } : {})
        },
        ...(authHeader
          ? {
              headers: {
                Authorization: authHeader
              }
            }
          : {})
      }
    );

    res.json(data);
  } catch (err) {
    if (err && err.response) {
      res.sendStatus(err.response.status);
    } else {
      res.sendStatus(500);
    }
  }
});

app.get("/sounds/:id", async (req, res) => {
  const { id } = req.params;
  const authHeader = req.header("Authorization");

  try {
    const { data } = await axios.get(
      `https://freesound.org/apiv2/sounds/${id}/`,
      {
        params: {
          ...(!authHeader ? { token: process.env.CLIENT_SECRET } : {})
        },
        ...(authHeader
          ? {
              headers: {
                Authorization: authHeader
              }
            }
          : {})
      }
    );

    res.json(data);
  } catch (err) {
    if (err && err.response) {
      res.sendStatus(err.response.status);
    } else {
      res.sendStatus(500);
    }
  }
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
