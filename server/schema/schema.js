const graphql = require('graphql');
const _ = require('lodash');

const ver = _.VERSION;
// eslint-disable-next-line no-console
console.log(ver);

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLList
} = graphql;

// dummy data
const books = [
  {
    name: 'Lord of the Rings', genre: 'Fantasy', id: '1', authorId: '1',
  },
  {
    name: 'The Lady in the Lake', genre: 'Crime', id: '2', authorId: '2',
  },
  {
    name: 'The Big Sleep', genre: 'Crime', authorId: '2',
  },
  {
    name: 'Seveneves', genre: 'Sci-fi', id: '3', authorId: '3',
  },
  {
    name: 'Reamde', genre: 'Sci-fi', id: '4', authorId: '3',
  },
  {
    name: 'Anathem', genre: 'Fantasy', id: '5', authorId: '3',
  },
];

const authors = [
  { name: 'JRR Tolkien', age: 99, id: '1' },
  { name: 'Raymond Chandler', age: 99, id: '2' },
  { name: 'Neil Stephenson', age: 54, id: '3' },
];


const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
       return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
    books: {
        type: new GraphQLList(BookType),
        resolve(parent, args) {
            return books
        }
    },
    authors: {
        type: new GraphQLList(AuthorType),
        resolve(parent, args) {
            return authors
        }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
