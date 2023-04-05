import cors from 'cors';
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { DataSource } from "typeorm";
import { Users } from './Model/user.ts';
import { schemaDetails } from './graphQl/schemas/index.js';

const main = async () => {

  const AppDataSource = new DataSource({
    type: "mysql",
    database: "node-graphql",
    username: "phpmyadmin",
    password: "root",
    logging: true,
    synchronize: false,
    entities: [Users]
  })

  await AppDataSource.initialize()
    .then(() => {
      console.log('Database Connected.');
    })
    .catch((error) => console.log(error))

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    "/api/graphql",
    graphqlHTTP({
      schema: schemaDetails,
      graphiql: true,
    })
  );

  app.listen(3000, () => {
    console.log('Server is running on port 3000 of localhost.')
  });
}

main().catch((error) => {
  console.log("app.js:31 ~ error:", error)
})
