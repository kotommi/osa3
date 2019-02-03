//env variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
// express server
const express = require("express");
const app = express();
// parsing json from http POST
const bodyParser = require("body-parser");
// Logging
const morgan = require("morgan");
// Gluing front- and backend
const cors = require("cors");

// odb model
const Person = require("./models/person");

morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(bodyParser.json());
app.use(express.static("build"));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use(cors());

app.get("/api/persons", (req, res) => {
  Person.find({}).then(persons => {
    res.json(
      persons.map(person => {
        const temp = person.toJSON();
        return temp;
      })
    );
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then(person => {
      if (person) {
        res.json(person.toJSON());
      } else {
        res.status(204).end();
      }
    })
    .catch(error => {
      next(error);
    });
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  if (!body) {
    return res.status(400).end();
  }

  const person = {
    name: body.name,
    number: body.number
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON());
    })
    .catch(error => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person
    .save()
    .then(savedPerson => {
      res.json(savedPerson.toJSON());
    })
    .catch(error => next(error));
});

app.get("/info", (req, res) => {
  Person.find({}).then(result => {
    const info = `<p>Puhelinluettelossa ${result.length} henkilön tiedot</p>
  <p>${new Date()}</p>`;
    res.send(info);
  });
});

// errorhandling middleware
const errorHandler = (error, req, res, next) => {
  console.log(error.message);
  if (error.name === "CastError" && error.kind == "ObjectId") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};
app.use(errorHandler);
//

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Started listening on port ${PORT}`);
});
