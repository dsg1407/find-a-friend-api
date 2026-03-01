import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/search', search)

  /** Rotas Autenticadas **/
  app.post('/add-new-pet', { onRequest: [verifyJwt] }, create)
}
