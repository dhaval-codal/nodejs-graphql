import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql'

export const todoTypes = new GraphQLObjectType({
    name: 'Todo',
    fields: () => ({
        id: { type: GraphQLID },
        description: { type: GraphQLString },
    })
})