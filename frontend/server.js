const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 8000;

function logRequests(req, res, next) {
  console.log(`Received request for ${req.url}`);
  next();
}

app.use('/seoul-api', createProxyMiddleware({
  target: 'http://openapi.seoul.go.kr:8088/',
  changeOrigin: true,
  pathRewrite: {'^/seoul-api': ''},
  onProxyRes: function(proxyRes, req, res) {
    console.log(`PROXY RESPONSE: Received response for ${req.url}`);
  },
  secure: false,
}));

app.use('/maps-api', createProxyMiddleware({
  target: 'http://maps.google.com/',
  changeOrigin: true,
  pathRewrite: {'^/maps-api': ''},
  onProxyRes: function(proxyRes, req, res) {
    console.log(`PROXY RESPONSE: Received response for ${req.url}`);
  },
  secure: false,
}));
app.use('/awes-api', createProxyMiddleware({
  target: 'http://3.39.223.21:8080/',
  changeOrigin: true,
  pathRewrite: {'^/awes-api': ''},
  onProxyRes: function(proxyRes, req, res) {
    console.log(`PROXY RESPONSE: Received response for ${req.url}`);
  },
  secure: false,
}));

app.use(logRequests);

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.set({
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Date: Date.now()
  });
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
