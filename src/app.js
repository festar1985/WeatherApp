import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import chalk from "chalk";
import hbs from "hbs";

import geocode from "./utils/geocode.js";
import forcast from "./utils/forcast.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const publicDir = path.join(__dirname, "../public");

const partialsDir = path.join(__dirname, "../views/partials");

app.set("view engine", "hbs");
hbs.registerPartials(partialsDir);

app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Georgi Konstantinov",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Georgi Konstantinov",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    message: "Here you will find quide",
    name: " by Georgi Konstantinov",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("Please specify an address");
  }
  geocode(req.query.address, (error, { longitude, latitude, location }) => {
    if (error) {
      return res.send({ error });
    }
    forcast(latitude, longitude, (error, forcastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forcast: forcastData,
        location,
        address: req.query.address,
      });
    });
  });
  //res.send(`Weather page for ${req.query.address} `);
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Article not found",
    message: "There is no such page",
    name: " by Georgi Konstantinov",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page not found",
    name: " by Georgi Konstantinov",
  });
});

app.listen(3001, () => {
  console.log(chalk.yellow.bold.italic("Program Started:)"));
});
