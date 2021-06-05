//jshint esversion:6
const bodyParser = require("body-parser");
const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");
const sendMail = require("./mail");

const app = express();
const log = console.log;
const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static(__dirname + "/public"));

//Routes
app.get("/", (req, res) => {
  res.render("portfolio", {
    title: "Portfolio",
    pageId: "portfolio",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    pageId: "about",
  });
});

app.get("/resume", (req, res) => {
  let { modal } = req.query;

  res.render("resume", {
    title: "Resume",
    pageId: "resume",
    modal: modal,
  });
});

app.post("/", (req, res) => {
  const { fullName, email, subject, message } = req.body;

  sendMail(
    _.trim(email),
    _.trim(fullName) + " || " + _.trim(subject),
    _.trim(message),
    (err, data) => {
      if (err) {
        log("Error: " + err);
        res.redirect("resume?modal=fail");
      }
      res.redirect("resume?modal=success");
    }
  );   
});

//404 Page not found
app.use((req, res, err) => {
  res.status(404).render("error", {
    title: "Error 404 Page not Found!",
    pageId: "error",
  });
});

//
app.listen(PORT, () => log("Server started on PORT ", PORT));
