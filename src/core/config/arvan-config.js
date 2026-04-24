const AWS  = require("aws-sdk")

const s3 = new AWS.S3({
  accessKeyId: process.env.ARVAN_ACCESS_KEY,
  secretAccessKey: process.env.ARVAN_SECRET_KEY,
  endpoint: process.env.ARVAN_ENDPOINT,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});

module.exports = s3