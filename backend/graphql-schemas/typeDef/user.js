import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql'

export const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },  
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    })
})