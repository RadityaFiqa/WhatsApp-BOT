const fetch = require("node-fetch");
const axios = require("axios");
require("dotenv").config();

exports.PHONE_ADMIN = process.env.NOMER;

exports.curl = async (url, option) => {
  return fetch(url, option);
};

exports.sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

exports.getBase64 = (url) => {
  try {
    return axios
      .get(url, {
        responseType: "arraybuffer",
        headers: {
          Connection: "keep-alive",
        },
      })
      .then(
        (response) =>
          "data:" +
          response.headers["content-type"] +
          ";base64," +
          Buffer.from(response.data, "binary").toString("base64")
      );
  } catch (e) {
    console.log("Get Error");
  }
};

exports.base64MimeType = (encoded) => {
  var result = null;

  if (typeof encoded !== "string") {
    return result;
  }

  var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

  if (mime && mime.length) {
    result = mime[1];
  }

  return result;
};

exports.ToIntegers = (value) => {
  if (/^[-+]?(\d+|Infinity)$/.test(value)) {
    return Number(value);
  } else {
    return NaN;
  }
};
