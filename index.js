const express = require("express");

const app = express();

const swaggerUi = require("swagger-ui-express");
//here we are using yaml instead of json to handle swagger
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
//express-fileUpload is used to uploa files, images and videos
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 8080;
//this is a middleware to handle swagger requests
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//this is a middleware to handle req.body requests
app.use(express.json());
//this is a middleware to handle file uploads
app.use(fileUpload());

let courses = [
  {
    id: "11",
    name: "Learn Reactjs",
    price: 299,
  },
  {
    id: "22",
    name: "Learn Angular",
    price: 399,
  },
  {
    id: "33",
    name: "Learn Django",
    price: 499,
  },
];

//app get for "/" route
app.get("/", (req, res) => {
  res.send("<h1>hello from Kumar Sumit</h1>\n");
});
//app get for "/api/v1/sumit swagger docs" route
app.get("/api/v1/lco", (req, res) => {
  res.send("<h1>hello from sumit swagger docs</h1>\n");
});

app.get("/api/v1/lcoobject", (req, res) => {
  res.send({ id: "55", name: "Learn Backend", price: 999 });
});

app.get("/api/v1/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/v1/mycourse/:courseId", (req, res) => {
  const myCourse = courses.find((course) => course.id === req.params.courseId);
  res.send(myCourse);
});

app.post("/api/v1/addCourse", (req, res) => {
  console.log(req.body);
  courses.push(req.body);
  res.send(true);
});

app.get("/api/v1/coursequery", (req, res) => {
  let location = req.query.location;
  let device = req.query.device;
  res.send({ location, device });
});

app.post("/api/v1/courseupload", (req, res) => {
  console.log(req.headers);
  const file = req.files.file;
  console.log(file);
  let path = __dirname + "/images/" + Date.now() + ".jpg";
  file.mv(path, (err) => {
    res.send(true);
  });
});

//app.listen at a port
app.listen(PORT, () => console.log(`Server is running at port ${PORT}...`));
