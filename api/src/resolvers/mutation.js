//Resolvers for mutations

module.exports = {
  //Add new note
  newNote: async (parent, args, { models }) => {
    //Build the note
    const note = await models.Note.create({
      content: args.content,
      author: 'Adam Scott',
    });
    //Return the note
    return {
      id: note._id.toString(),
      content: note.content,
      author: note.author,
    };
  },
};
