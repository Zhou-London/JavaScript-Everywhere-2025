//Resolvers for Query

module.exports = {
  //Return all notes
  notes: async (parent, args, { models }) => {
    return await models.Note.find();
  },

  //Return Single Note
  note: async (parent, args, { models }) => {
    return await models.Note.findById(args.id);
  },
};
