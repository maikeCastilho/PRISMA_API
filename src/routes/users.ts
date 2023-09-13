import { FastifyInstance, FastifyRequest } from "fastify";
import { prisma } from '../lib/prisma'

export async function usersRoutes(app: FastifyInstance) {
    app.get('/users', async () => {
        const user = await prisma.user.findMany();
        return user;
    })

    app.post('/cadastro', async (request: FastifyRequest) => {
        try {
            const { name, email, password} = request.body;

            if (!name || !email || !password) {
                return {
                    error: 'Algo de errado'
                };
            }
            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                }
            });
            return newUser;

        } catch (error) {
            return {
                error: 'Deu ruim ao criar'
            }
        }
    })



}