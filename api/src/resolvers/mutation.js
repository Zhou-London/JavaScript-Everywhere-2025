//Resolvers for mutations

//Hash algorithm
const argon2 = require('argon2');

//Json Web Token
const jwt = require('jsonwebtoken');

//Authentication from Apollo Servers
const {
  AuthenticationError,
  ForbiddenError,
} = require('@apollo/server/errors');

//Load the environment file
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../myenv.env') });

//Import gravatar (After some modifications)
const gravatar = require('../util/gravatar');

//Import DataBase Models
const { models } = require('mongoose');

module.exports = {
  //**Add new note**
  newNote: async (parent, args, { models }) => {
    //Build a note, insert it to database
    const note = await models.Note.create({
      content: args.content,
      author: 'Adam Scott',
    });
    //Return this note
    return {
      id: note._id.toString(),
      content: note.content,
      author: note.author,
    };
  },

  //**Delete a note**
  deleteNote: async (parent, { id }, { models }) => {
    try {
      //findOneAndRemove -> findOneAndDelete
      await models.Note.findOneAndDelete({ _id: id });
      return true;
    } catch (err) {
      return false;
    }
  },

  //**Update a note**
  updateNote: async (parent, { content, id }, { models }) => {
    //Update a note, store it
    const updatedNote = await models.Note.findOneAndUpdate(
      { _id: id },
      { $set: { content } },
      { new: true },
    );
    //return the node
    return updatedNote;
  },

  //**User Sign Up**
  signUp: async (parent, { username, email, password }, { models }) => {
    //Truncate the email
    email = email.trim().toLowerCase();

    //Hash the password, bcrypt -> argon2
    const hashed = await argon2.hash(password);

    //Get avatar of email
    const avatar = gravatar(email);
    try {
      //Create data in database
      const user = await models.User.create({
        username,
        email,
        avatar,
        password: hashed,
      });

      //Return a json web token
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (err) {
      //Catch errors
      console.log(err);
      throw new Error('Error creating account');
    }
  },

  //**Sign In**
  signIn: async (parent, { username, email, password }, { models }) => {
    if (email) {
      //Truncate email
      email.trim().toLowerCase();
    }

    //Find user
    const user = await models.User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      throw new AuthenticationError('Error signning in');
    }

    //Check if valid
    const valid = await argon2.verify(user.password, password); //Hashed, Plain
    if (!valid) {
      throw new AuthenticationError('Error signning in');
    }

    //Return Json Web Token
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  },
};
