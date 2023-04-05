import { buildSchema } from "graphql";

const schemasDetails = buildSchema(`
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
`);

export { schemasDetails };
