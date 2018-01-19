const express = require('express');
const graphqlHTTP = require('express-graphql');
const { GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString } = require('graphql');
const { find, times } = require('lodash');
const cors = require('cors');

const names = ['john', 'jane', 'james', 'janet'];
const db = times(names.length, id => ({
  id,
  info: { name: names[id] }
}));

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      userCount: {
        type: GraphQLInt,
        resolve: () => db.length
      },
      user: {
        type: new GraphQLObjectType({
          name: 'User',
          fields: {
            id: { type: GraphQLInt },
            info: {
              type: new GraphQLObjectType({
                name: 'UserInfo',
                fields: {
                  name: { type: GraphQLString }
                }
              })
            }
          }
        }),
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (source, { id }) => find(db, ({ id: userId }) => id === userId)
      }
    }
  })
});

const app = express();

// cross origin allow all
app.use(cors());

app.use(
  '*',
  graphqlHTTP({
    schema,
    graphiql: true // visit localhost:[port] to use the graphiQL interactive API explorer
  })
);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`express listening on localhost:${port}`));
