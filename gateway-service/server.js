import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const PORT = 7000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log("Gateway received request:", req.method, req.url);
    next();
});

app.use("/api/users", createProxyMiddleware({
    target: "http://localhost:5000",
    changeOrigin: true,
    pathRewrite: { "^/api/users": "/api/auth" } // only for auth routes
}));

app.use("/api/orders", createProxyMiddleware({
    target: "http://localhost:5000",
    changeOrigin: true
}));

app.use("/api/products", createProxyMiddleware({
    target: "http://localhost:6000",
    changeOrigin: true
}));

app.listen(PORT, () => console.log(`Gateway running on port ${PORT}`));
