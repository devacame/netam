// /pages/api/graphql.ts
import { ApolloServer } from 'apollo-server-micro'
import { schema } from '@/graphql/schema'
import { createContext } from '@/graphql/context'
import Cors from 'micro-cors'

const cors = Cors()
const apolloServer = new ApolloServer({
    schema,
    context: createContext,
})

const startServer = apolloServer.start()

export default cors(async function handler(req, res): Promise<any> {
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader(
        'Access-Control-Allow-Origin',
        'https://studio.apollographql.com'
    )
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    if (req.method === 'OPTIONS') {
        res.end()
        return false
    }

    await startServer

    await apolloServer.createHandler({
        path: '/api/graphql',
    })(req, res)
})

export const config = {
    api: {
        bodyParser: false,
    },
}
