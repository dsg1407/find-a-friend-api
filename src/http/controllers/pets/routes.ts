import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  /** Rotas Autenticadas **/
  app.post('/add-new-pet', { onRequest: [verifyJwt] }, create)
}
