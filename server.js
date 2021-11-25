const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const apiRoutes = require("./routes");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(morgan("dev"));

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(express.static("public"));


app.use(apiRoutes);

connectToDb().catch(err => console.log(err));

async function connectToDb() {
  await mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      }
  );
}

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});