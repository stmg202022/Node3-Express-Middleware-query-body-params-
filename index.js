const fs = require("fs");
const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

// console.log(data);
// console.log(index);
// console.log(typeof products);

const express = require("express");
const app = express();

//======MiddleWare=====

//Middleware used for whole application
// app.use((req, res) => {
//   console.log(
//     req.method,
//     req.ip,
//     req.hostname,
//     new Date(),
//     req.get("User-Agent")
//   );

//   req.next();
// });

//-------------bodyParser-----------Build-in Middleware
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.static("public"));

const auth = (req, res, next) => {
  // console.log(req.query); // req.query check the path // output: {} //as it is empty
  // send http://localhost:8080/?password and reload // output: { password: ""}
  // send http://localhost:8080/?password=123 and reload // output: { password: "123"} // 123
  console.log(req.query.password);

  //if http://localhost:8080/?password=123 then next() // do not put any password for auth and use ==
  if (req.query.password === "123") {
    next();
  } else {
    res.sendStatus(401);
  }

  //   next();

  // if (req.body.password === "123") {
  //   next();
  // } else {
  //   res.sendStatus(401);
  // }
};

// It used for all method(GET, PUT, POST...)
// app.use(auth);

//===============API -Endpoint  -Route==========
//using auth for GET method
app.get("/", auth, (req, res) => {
  res.json({ type: "GET" });
});

//using auth for POST methdod
app.post("/", auth, (req, res) => {
  res.json({ type: "POST" });
});

app.put("/", (req, res) => {
  res.json({ type: "PUT" });
});

app.delete("/", (req, res) => {
  res.json({ type: "DELETE" });
});

app.patch("/", (req, res) => {
  res.json({ type: "PATCH" });
});

app.get("/demo", (req, res) => {
  //   res.sendStatus(404);
  //   res.send("<h1>Hello World</h1>");
  //   res.status(201).send("<h1>Hello World</h1>");
  //   res.json(products);
});

app.listen(8080, () => {
  console.log("server started");
});
