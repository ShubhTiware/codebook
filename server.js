const jsonServer = require("json-server");
const auth = require("json-server-auth");
const path = require("path");
const fs = require("fs");

const app = jsonServer.create();

const router = jsonServer.router(path.join(__dirname, "data/db.json"));
const middleware = jsonServer.defaults();

//Load custom routes
const routes = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data/routes.json"))
);
const rewriter = jsonServer.rewriter(routes);

app.db = router.db;

// Set default middlewares (logger, static, cors, etc)
app.use(middleware);

//Use custom route rewriter
app.use(rewriter);

// Use the auth middleware
app.use(auth);

// Use the router
app.use(router);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`JSON Server with Auth running at http://localhost:${PORT}`);
});
