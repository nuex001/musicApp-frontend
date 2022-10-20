const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://musicapp-api.onrender.com",
      changeOrigin: true,
    })
  );
};
// "proxy" = "http://0.0.0.0:5000"
