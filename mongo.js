const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("invalid arguments. (pw OR pw name number)");
  process.exit();
}

const password = process.argv[2];

const url = `mongodb://tomko:${password}@ds257851.mlab.com:57851/mongotk`;

mongoose.connect(url, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model("Person", personSchema);

const addPerson = () => {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  });

  person.save().then(res => {
    console.log("person saved!");
    mongoose.connection.close();
  });
};

const listPersons = () => {
  Person.find({}).then(res => {
    console.log("puhelinluettelo:");
    res.forEach(person => {
      console.log(person.name + " " + person.number);
    });
    mongoose.connection.close();
  });
};

// control flow

if (process.argv.length > 3) {
  addPerson();
} else {
  listPersons();
}
