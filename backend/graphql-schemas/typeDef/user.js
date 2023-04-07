import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'
import { todoTypes } from './todos.js'

export const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        todos: { type: new GraphQLList(todoTypes) }
    })
})