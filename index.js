const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(bodyParser.json());

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use(cors());

let persons = [
  {
    name: "Arto Hellas",
    number: "045-1236543",
    id: 1
  },
  {
    name: "Martti Tienari",
    number: "040-123456",
    id: 2
  },
  {
    name: "Arto Järvinen",
    number: "040-123456",
    id: 3
  },
  {
    name: "Lea Kutvonen",
    number: "040-123456",
    id: 4
  }
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);
  if (!person) {
    return res.status(404).end();
  }
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  //error handling
  if (body.name === undefined) {
    return res.status(400).json({ error: "name missing" });
  }
  if (body.number === undefined) {
    return res.status(400).json({ error: "number missing" });
  }
  if (nameInList(body.name)) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  };
  persons = persons.concat(person);
  res.json(person);
});

const nameInList = name => {
  return persons.filter(person => person.name === name).length > 0;
};

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0;
  return maxId + 1;
};

app.get("/info", (req, res) => {
  const info = `<p>Puhelinluettelossa ${persons.length} henkilön tiedot</p>
  <p>${new Date()}</p>`;
  res.send(info);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Started listening on port ${PORT}`);
});
