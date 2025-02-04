//Import mongoose
const mongoose = require('mongoose');

//Define the Note schema
const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      //Cut off the spaces
      trim: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  //Stores the date/time when it is created and updated
  { timestamps: true },
);

//Define the Note Model using its schema
const Note = mongoose.model('Note', noteSchema);

//Export the model
module.exports = Note;
