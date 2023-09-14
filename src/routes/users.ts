import { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function usersRoutes(app: FastifyInstance) {
    app.get('/users', async () => {
        const user = await prisma.user.findMany({

            // orderBy: { //ORDENA O RETORNO EM ORDEM ALFABÉTICA asc(crescente) || desc(decrescente)
            //     // name: "asc" ,
            //     id: "asc"
            // },

            // where: {//CONDICIONA O RETORNO AO ID: 2
            //     id: 2

            // },

            // select: { //ESPECIFICA QUAIS CAMPOS SERÃO RETORNADOS DA TABELA: BOOL
            //     id: true,
            //     name: true

            // },

            // skip: 2, // Pula os primeiros 2 registros
            // take: 3,  // Retorna apenas 3 registros

            // cursor: {
            //     id: 2 //começa a consulta a partir do registro com id 2
            // },

            // distinct: ['name'], // Retorna nomes de usuários distintos

            // groupBy: {
            //     name: true, // Agrupa os resultados pelo campo "name"
            //   }

            // count: true
        });
        return user;
    })


// ###### FILTRANDO USER BY NAME ######
    app.get('/users/:name', async (request) => {
        try {
            const paramsSchema = z.object({
                name: z.string(),
            });

            const { name } = paramsSchema.parse(request.params);

            const user = await prisma.user.findFirst({
                where: {
                    name,
                },
            });

            if (!user) {
                return { error: "usuário não encontrado" };
            }

            return user;
        } catch (error) {
            console.error('Erro interno no servidor', error);
            throw new Error('Error interno do servidor');
        };
    });



    app.post('/users/:id', async (request) => {
        try {
            const bodySchema = z.object({
                id: z.string().refine((val) => !isNaN(Number(val)), {
                    message: 'O parâmetro deve ser um número'
                }),
            });

            const { id } = bodySchema.parse(request.body);

            const user = await prisma.user.findFirst({
                where: {
                    id: Number(id),
                },
            });

            if (!user) {
                return { error: "usuário não encontrado" };
            }

            return user;
        } catch (error) {
            console.error('Erro interno no servidor', error);
            throw new Error('Error interno do servidor');
        };
    });

    const userSchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
    })

    app.post('/users/cadastro', async (request) => {
        try{
            const {name, email, password} = userSchema.parse(request.body);
            const newUser = await prisma.user.create({
                data: {   
                    name,
                    email,
                    password
                }
            });
            return `Usuário criado com sucesso, id:${newUser.id}`;
        } catch (error) {
            console.error('Error ao criar user', error);
            throw new Error('Erro  ao criar o usuario');
        }
    });


    






};






