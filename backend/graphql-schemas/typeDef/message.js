import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from 'graphql'

export const responseType = new GraphQLObjectType({
    name: 'responseType',
    fields: () => ({
        error: { type: GraphQLBoolean },
        message: { type: GraphQLString }
    })
})