import cors from 'cors';
import env from 'dotenv';
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { DataSource } from "typeorm";
import { authMiddleware } from './graphql-schemas/authMiddleware.js';
import { schemaDetails } from './graphql-schemas/index.js';
import { Users } from './models/app-user.js';
import { Todos } from './models/todo.js';

const main = async () => {

  // dotEnv config
  env.config()

  const AppDataSource = new DataSource({
    type: "mysql",
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER_NAME,
    password: process.env.DATABASE_PASSWORD,
    logging: true,
    synchronize: true,
    entities: [Users, Todos]
  })

  await AppDataSource.initialize()
    .then(() => {
      console.log('Database Connected.');
    })
    .catch((error) => console.log(error))

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(authMiddleware);
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
