import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import resolvers from './resolver/index.js';
import typeDefs from './typeDefs.js'
import { mySQLConnect } from './helpers/mySQL.js';
import cron from './helpers/cron.js'


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await mySQLConnect();
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

await cron();

console.log(`🚀  Server ready at: ${url}`);