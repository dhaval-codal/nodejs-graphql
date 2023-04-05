import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { createUser } from "./mutations/user.js";
import { getAllUsers } from "./queries/user.js";

const rootQuery = new GraphQLObjectType({
    name: "rootQuery",
    fields: {
        getAllUser: getAllUsers
    }
})

const rootMutation = new GraphQLObjectType({
    name: "rootMutation",
    fields: {
        createUser: createUser
    }
})

export const schemaDetails = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
})