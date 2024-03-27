// const type { AddUserInput,  User } = require("fs").readFileSync(
//   require.resolve("./schema.graphql"),
//   "utf8"
// );

const resolvers = {
  Query: {},
  Mutation: {
    login: (_parent: any, { input }: any): any => {
      return {
        email: 'YOU ARE IN DUDE',
      }
    },
    logout: (_parent: any, { input }: any): boolean => {
      return true
    },
  },
}

export default resolvers
