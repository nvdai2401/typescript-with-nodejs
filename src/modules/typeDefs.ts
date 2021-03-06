import gql from 'graphql-tag'
import { mergeTypes } from 'merge-graphql-schemas'
import userTypeDefs from './user/graphql/typedef'
import transactionTypeDefs from './transaction/graphql/typedef'

const baseTypeDefs = gql`
  directive @isAuthenticated on FIELD | FIELD_DEFINITION
  scalar Upload
  scalar Date

  type Query {
    hello: String
  }

  type Mutation {
    hello(name: String): String
  }
`

const typeDefs = [baseTypeDefs, userTypeDefs, transactionTypeDefs]

export default mergeTypes(typeDefs, { all: true })
