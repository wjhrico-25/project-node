// import "reflect-metadata"
// import { AppDataSource } from "./data-source"
// import { ApolloServer } from "apollo-server-express";
//import * as express from "express"

import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import { AppDataSource } from "./data-source";
import * as session from 'express-session';
// import { User } from "./entity/User"

// AppDataSource.initialize().then(async () => {

//     console.log("Inserting a new user into the database...")
//     const user = new User()
//     user.firstName = "Timber"
//     user.lastName = "Saw"
//     user.age = 25
//     await AppDataSource.manager.save(user)
//     console.log("Saved a new user with id: " + user.id)

//     console.log("Loading users from the database...")
//     const users = await AppDataSource.manager.find(User)
//     console.log("Loaded users: ", users)

//     console.log("Here you can setup and run express / fastify / any other framework.")

// }).catch(error => console.log(error))
const { ApolloServer } = require('apollo-server-express');
const express = require('express');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}: any) => ({req})
});

async function startServer() {
    await AppDataSource.initialize() //need to be initialise db

    await server.start();

    const app = express();

    app.use(session({
        secret: "testing",
        resave: false, //constantly resave the session
        saveUninitialized: false
        })
    );


    server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer().catch((error) => console.log(error));