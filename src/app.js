const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

// console.log(__dirname)
// console.log(__filename);
// console.log(path.join(__dirname, '../public'));

const app = express();

//Defined paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: ""
  }); //this has to be similar to the name in views folder
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "need help",
    name: "credit to andrew"
  }); //this has to be similar to the name in views folder
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about Weather"
  }); //this has to be similar to the name in views folder
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "help not found"
  });
});

app.get("/products", (req, res) => {
  console.log("req.query  : " + req.query.name);
  if (!req.query.name) {
    return res.send({
      error: "name and type"
    });
  }
  res.send({
    products: []
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "type in address as key"
    });
  } else {
    geocode(req.query.address, (error, response) => {
      if (response) {
        let { latitude, longitude, location } = response;
        forecast(latitude, longitude, (error, response) => {
          if (response) {
            return res.send({
              location: location,
              forecast: response,
            });
          } else {
            return res.send({
              error: " lat or land incorrect"
            });
          }
        });
      } else {
        return res.send({
          error: " address doesnot exist"
        });
      }
    });
  }
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "page not found"
  });
});

app.listen(3000, () => {
  console.log("Server is up on 3000");
});

// app.get("/about", (req, res) => {
//   res.send([{ name: "universe" }, { child: "earth" }]);
// });
