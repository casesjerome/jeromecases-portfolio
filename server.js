//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const sendMail = require("./mail");

const app = express();
const log = console.log;
const PORT = 8080;

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static(__dirname + "/public"));

//Routes
app.get("/", (req, res) => {
  let {modal} = req.query;

  res.render("resume", {
    title: "Resume",
    pageId: "resume",
    modal: modal
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    pageId: "about",
  });
});

app.get("/portfolio", (req, res) => {
  res.render("portfolio", {
    title: "Portfolio",
    pageId: "portfolio",
  });
});

app.post("/", (req, res) => {
  const { fullName, email, subject, message } = req.body;
  
  sendMail(email, fullName + " || " + subject, message, (err, data) => {
    if (err) {
      log("Error: " + err);
      res.redirect("/?modal=fail");
    }
    res.redirect("/?modal=success");
  });
  
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
