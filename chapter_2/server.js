// Address of this server connected to the network is:
// URL -> http://localhost:8383
// IP -> 127.0.0.1:8383
const express = require("express");
const app = express();
const PORT = 8383;

let data = ["kenny"];

// MIDDEWARE
app.use(express.json()); //configure server to expect json data

// ENDPOINT - HTTP Verbs (method) & paths/routes

// Type 1: Website endpoints -> send back html when user enters url in browser

app.get("/", (req, res) => {
  console.log("user request home page");
  res.send(`
    <body
    style="background:pink;
    color:blue;">
        <h1>DATA:</h1>
        <p>${JSON.stringify(data)}</p>
        <a href="/dashboard">Dashboard</a>
    </body>
    <script>console.log('this is my script')</script>
    `);
});

app.get("/dashboard", (req, res) => {
  res.send(`
    <body>
        <h1>Dashboard</h1>
        <a href="/">Home</a>
    </body>
    `);
});

// Type 2: API endpoints (non visual)

// CRUD-method : create-post, read-get, update-put, delete-delete
app.get("/api/data", (req, res) => {
  console.log("This one was for data");
  res.status(599).send(data);
});

app.post("/api/data", (req, res) => {
  const newEntry = req.body;
  console.group(newEntry);
  data.push(newEntry.name);
  res.sendStatus(201);
});

app.delete("/api/data", (req, res) => {
  data.pop();
  console.log("Deleted last element of array");
  res.sendStatus(203);
});

app.listen(PORT, () => {
  console.log(`Server has started on: ${PORT}`);
});
