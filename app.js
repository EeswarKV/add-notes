const express = require("express");
const bodyParser = require("body-parser");

const notes = [];

var defaultColor = "yellow";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.render("home", {
    data: notes,
    defaultColor: defaultColor,
  });
});

app.post("/", (req, res) => {
  const noteContent = req.body.noteContent;
  const noteId = notes.length + 1;

  notes.push({
    noteId: noteId,
    noteContent: noteContent,
    noteColor: defaultColor || "yellow",
  });

  res.render("home", {
    data: notes,
    defaultColor: defaultColor,
  });
});

app.post("/update", (req, res) => {
  var noteId = req.body.noteId;
  var noteContent = req.body.noteContent;
  var noteColor = req?.body?.noteColor;
  notes.forEach((note) => {
    if (note.noteId == noteId) {
      note.noteContent = noteContent;
      note.noteColor = noteColor || "yellow";
    }
  });
  res.render("home", {
    data: notes,
    defaultColor: defaultColor,
  });
});

app.post("/updatecolor", (req, res) => {
  var noteColor = req?.body?.noteColor;
  defaultColor = noteColor;
  notes.forEach((note) => {
    if (note.noteId == 0) {
      note.noteColor = defaultColor || "yellow";
    }
  });
  res.render("home", {
    data: notes,
    defaultColor: defaultColor,
  });
});

app.post("/delete", (req, res) => {
  var noteId = req.body.noteId;

  var j = 0;
  notes.forEach((note) => {
    j = j + 1;
    if (note.noteId == noteId) {
      notes.splice(j - 1, 1);
    }
  });

  res.render("home", {
    data: notes,
    defaultColor: defaultColor,
  });
});

app.listen(3000, (req, res) => {
  console.log("App is running on port 3000");
});
