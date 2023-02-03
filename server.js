const fs = require("fs");
const http = require("http");
const users = [
  {
    id: 1,
    name: "John",
    email: "John@gmail.com",
    password: "john!@#$",
    createdAt: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
    updatedAt: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
  },
  {
    id: 2,
    name: "Sanny",
    email: "Sanny@gmail.com",
    password: "sanny!@#$",
    createdAt: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
    updatedAt: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
  },
  {
    id: 3,
    name: "Zexi",
    email: "Zexi@gmail.com",
    password: "zexi!@#$",
    createdAt: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
    updatedAt: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
  },
];

const server = http.createServer((req, res) => {
  const isRootUrl = req.url === "/";
  if (isRootUrl) {
    fs.readFile("index.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else if (req.url === "/script.js") {
    fs.readFile("script.js", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(data);
      res.end();
    });
  } else if (req.url === "/style.css") {
    fs.readFile("style.css", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.write(data);
      res.end();
    });
  } else if (req.url === "/users") {
    if (req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(users));
      res.end();
    } else if (req.method === "POST") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        const newUser = JSON.parse(data);
        users.push(newUser);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(users));
        res.end();
      });
    } else if (req.method === "PUT") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        const userRequest = JSON.parse(data);
        const updateUser = users.find(
          (user) => user.email === userRequest.email
        );
        if (updateUser) {
          updateUser.name = userRequest.name;
          updateUser.password = userRequest.password;
          res.writeHead(200, { "Content-Type": "application/json" });
          res.write(JSON.stringify(users));
          res.end();
        }
      });
    } else if (req.method === "DELETE") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        const userRequest = JSON.parse(data);
        const deletedUser = users.find((user) => user.id === userRequest.id);
        if (deletedUser) {
          const deletedUserIndex = users.indexOf(deletedUser);
          users.splice(deletedUserIndex, 1);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.write(JSON.stringify(users));
          res.end();
        }
      });
    }
  } else if (req.url === "/fileUpload") {
    if (req.method === "POST") {
      const writeStream = fs.createWriteStream("test.mp4");
      req.pipe(writeStream);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ message: "Successfully Upladed Video!!" }));
      res.end();
      // let data = "";
      // req.on("data", (chunk) => {
      //   data += chunk;
      // });
      // req.on("end", () => {
      //   const content = JSON.parse(data).test;
      //   fs.writeFileSync("test.txt", content);
      //   res.writeHead(200, { "Content-Type": "application/json" });
      //   res.write(JSON.stringify({ message: "Successfully Created File!!" }));
      //   res.end();
      // });
    }
  } else if (req.url === "/updateUser.html") {
    fs.readFile("updateUser.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else {
    res.writeHead(500);
    res.write("<h1>Unknown route</h1>");
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Server started: Listening on port 3000");
});
