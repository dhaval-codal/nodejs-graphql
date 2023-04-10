import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { createUserTodo, deleteUserTodo, updateUserTodoDetails } from "./mutations/todos.js";
import { createUser, deleteUser, loginUser, updateUserDetails, updateUserPassword } from "./mutations/user.js";
import { getUsersAllTodos } from "./queries/todos.js";
import { getAllUsers, getUsersDetails } from "./queries/user.js";

const rootQuery = new GraphQLObjectType({
    name: "rootQuery",
    fields: {
        getAllUser: getAllUsers,
        getUsersDetails: getUsersDetails,
        getUsersAllTodos: getUsersAllTodos
    }
})

const rootMutation = new GraphQLObjectType({
    name: "rootMutation",
    fields: {
        loginUser: loginUser,
        singUpUser: createUser,
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