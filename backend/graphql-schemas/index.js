import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { createUserTodo, deleteUserTodo, updateUserTodoDetails } from "./mutations/todos.js";
import { createUser, deleteUser, updateUserDetails, updateUserPassword } from "./mutations/user.js";
import { getUsersAllTodos } from "./queries/todos.js";
import { getAllUsers } from "./queries/user.js";

const rootQuery = new GraphQLObjectType({
    name: "rootQuery",
    fields: {
        getAllUser: getAllUsers,
        getUsersAllTodos: getUsersAllTodos
    }
})

const rootMutation = new GraphQLObjectType({
    name: "rootMutation",
    fields: {
        createUser: createUser,
        deleteUser: deleteUser,
        updateUserPassword: updateUserPassword,
        updateUserDetails: updateUserDetails,
        createUserTodo: createUserTodo,
        updateUserTodoDetails: updateUserTodoDetails,
        deleteUserTodo: deleteUserTodo
    }
})

export const schemaDetails = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
})