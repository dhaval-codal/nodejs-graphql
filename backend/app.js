const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

app.use(bodyParser.json());

app.get("/", (request, response, next) => {
  response.send("Welcome to learn GraphQl + Nodejs.");
});

app.use(
  "/api/graphql",
  graphqlHTTP({
    schema: buildSchema(`
        type RootQuery {
            events: [String!]!
        }
        
        type RootMutation {
            createEvent(name: String): String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: (arguments) => {
        return ["Event 1", "Event 2"];
      },
      createEvent: (arguments) => {
        const eventName = arguments.name;
        return eventName;
      },
    },
    graphiql: true,
  })
);

app.listen(3000);
