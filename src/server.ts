import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'

import routes from './rest/routes'

import resolvers from './graphql/resolvers'

const typeDefs = require('fs').readFileSync(require.resolve('./graphql/schema.graphql'), 'utf8')

interface MyContext {
  token?: String
}

const CORS_OPTIONS = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
}

async function startup() {
  const app = express()

  const httpServer = http.createServer(app)

  const apolloServer = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await apolloServer.start()

  app.use(cors<cors.CorsRequest>(CORS_OPTIONS))

  routes(app)

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),

    bodyParser.json({ limit: '50mb' }),

    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  )

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve))

  console.log(`Server ready at http://localhost:4000/rest`)
}

startup()
