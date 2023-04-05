import { resolverDetails } from "#graphql/resolver.js";
import { schemasDetails } from "#graphql/schema.js";
import bodyParser from "body-parser";
import express from "express";
import { graphqlHTTP } from "express-graphql";

const app = express();

app.use(bodyParser.json());

app.get("/", (request, response, next) => {
  response.send("Welcome to learn GraphQl + Nodejs.");
});

app.use(
  "/api/graphql",
  graphqlHTTP({
    schema: schemasDetails,
    rootValue: resolverDetails,
    graphiql: true,
  })
);

app.listen(3000);
