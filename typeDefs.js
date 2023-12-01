const typeDefs = `#graphql

 input UserInput {
  title: String!
  firstname: String!
  lastname: String!
  email: String!
  gender: Gender!
 }
 type User{
  id:Int
  title: String!
  firstname: String!
  lastname: String!
  email: String!
  gender: Gender!
  created_at: String!
 }
  

 enum Gender{
  MALE,
  FEMALE
 }

 type Transaction{
  id:Int!
  user_id:Int!
  transaction_date:String!
  due_date:String!
  amount:String!
  payment_status:String!
  notes_comments:String!

 }
 input TransactionInput{
  user_id:Int!
  amount:String!
  notes_comments:String!

 }
 enum status {
  PENDING
  SUCCESSFUL
  CANCELED
 }

 type Mutation{
  #USER
  CreateUser(details:UserInput!): Boolean!
  UpdateUser(user_id:Int!, details:UserInput!): Boolean!
  DeleteUser(user_id:Int!): Boolean!

  #TRANSACTION
  CreateTransaction(details:TransactionInput!): Boolean!
  UpdateTransaction(id:Int!, details:TransactionInput!): Boolean!
  DeleteTransaction(id:Int!): Boolean!
 }

 type Query{
  GetUsers:[User!]!

  GetTransactions:[Transaction!]!
 }

`

export default typeDefs