const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();
const eventsList = [];

app.use(bodyParser.json());

app.get("/", (request, response, next) => {
  response.send("Welcome to learn GraphQl + Nodejs.");
});

app.use(
  "/api/graphql",
  graphqlHTTP({
    schema: buildSchema(`
        type eventsDetails {
            _id: ID!
            name: String!
            description: String
            price: Float!
        }
    
        input eventsInput {
            name: String!
            description: String
            price: Float!
        }

        type RootQuery {
            events: [eventsDetails!]!
        }
        
        type RootMutation {
            createEvent(eventInput: eventsInput): eventsDetails
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: (arguments) => {
        return eventsList;
      },
      createEvent: (arguments) => {
        const eventDetails = arguments.eventInput;
        const createEventDetails = {
          _id: Math.random().toString(),
          name: eventDetails.name,
          description: eventDetails.description,
          price: eventDetails.price,
        };
        eventsList.push(createEventDetails);
        return createEventDetails;
      },
    },
    graphiql: true,
  })
);

app.listen(3000);
