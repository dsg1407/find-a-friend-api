import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { search } from './search'
import { getPet } from './get-pet'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/search', search)
  app.get('/pet/:id', getPet)

  /** Rotas Autenticadas **/
  app.post('/add-new-pet', { onRequest: [verifyJwt] }, create)
}
