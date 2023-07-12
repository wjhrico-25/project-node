import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    full_name: String!
    email: String!
  }

  type Query {
    hello: String!
  }

  type Mutation {
    register(full_name: String!, email: String!, password: String!): Boolean!
    login(email: String!, password: String!): User
  }
`;