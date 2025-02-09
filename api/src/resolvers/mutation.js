//Resolvers for mutations

module.exports = {
  //Add new note
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

  //delete a note
  deleteNote: async (parent, { id }, { models }) => {
    try {
      //findOneAndRemove -> findOneAndDelete
      await models.Note.findOneAndDelete({ _id: id });
      return true;
    } catch (err) {
      return false;
    }
  },

  //update a note
  updateNote: async (parent, { content, id }, { models }) => {
    //Update a note, store it
    const updatedNote = await models.Note.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          content,
        },
      },
      {
        new: true,
      },
    );
    //return the node
    return updatedNote;
  },
};
