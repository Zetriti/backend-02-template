const http = require("http");
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {
  if (request.url === "/favicon.ico") {
    response.statusCode = 204;
    response.end();
    return;
  }

  const url = new URL(request.url, "http://127.0.0.1");
  const params = url.searchParams;

  if (params.has("hello")) {
    const name = params.get("hello");
    if (name && name.trim() !== "") {
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/plain");
      response.end(`Hello, ${name}.`);
    } else {
      response.statusCode = 400;
      response.setHeader("Content-Type", "text/plain");
      response.end("Enter a name");
    }
    return;
  }

  if (params.has("users")) {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.end(getUsers());
    return;
  }

  if (params.toString() === "") {
    if (request.url !== "/") {
      response.statusCode = 500;
      response.setHeader("Content-Type", "text/plain");
      response.end(); // пустой ответ
      return;
    }

    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.end("Hello, World!");
    return;
  }

  response.statusCode = 500;
  response.setHeader("Content-Type", "text/plain");
  response.end();
});

server.listen(3003, () => {
  console.log("Сервер запущен http://127.0.0.1:3003");
});
