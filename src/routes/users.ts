import { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { Prisma } from "@prisma/client";

export async function usersRoutes(app: FastifyInstance) {
    const jwt = require('jsonwebtoken');
    const { v4: uuidv4 } = require('uuid');
    const bcrypt = require('bcrypt');





    app.get('/users', async () => {
        const user = await prisma.user.findMany({
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
    // app.get('/users/:name_user', async (request) => {
    //     try {
    //         const paramsSchema = z.object({
    //             name_user: z.string(),
    //         });

    //         const { name_user } = paramsSchema.parse(request.params);

    //         const user = await prisma.user.findFirst({
    //             where: {
    //                 name_user,
    //             },
    //         });

    //         if (!user) {
    //             return { error: "usuário não encontrado" };
    //         }

    //         return user;
    //     } catch (error) {
    //         console.error('Erro interno no servidor', error);
    //         throw new Error('Error interno do servidor');
    //     }
    // });


    app.get('/users/:id_user', async (request) => {
        try {
            const paramsSchema = z.object({
                id_user: z.string(),
            });

            const { id_user } = paramsSchema.parse(request.params);

            const user = await prisma.user.findFirst({
                where: {
                    id_user: Number(id_user),// Certifique-se de que id_user seja tratado como string
                },
            });

            if (!user) {
                return { error: "usuário não encontrado" };
            }

            return user;
        } catch (error) {
            console.error('Erro interno no servidor', error);
            throw new Error('Error interno do servidor');
        }
    });




    const loginSchema = z.object({
        email_user: z.string(),
        password_user: z.string(),
    });





    app.post('/users/login', async (request) => {
        try {
            const { email_user, password_user } = loginSchema.parse(request.body);

            const user = await prisma.user.findFirst({
                where: {
                    email_user,
                }
            });

            if (!user) {
                return {
                    error: 'Credenciais inválidas'
                };
            }

            const isPasswordValid = await bcrypt.compare(password_user, user.password_user);

            if (!isPasswordValid) {
                return {
                    error: 'Credenciais inválidas'
                };
            }

            const token = jwt.sign({ userId: user.id_user }, 'EstaEhUmaChaveMuitoSecreta123!@#');

            return {
                message: 'Login bem sucedido',
                userId: user.id_user,
                token,
            };
        } catch (error) {
            console.error('Erro ao fazer login', error);
            throw new Error('Erro ao fazer login');
        }
    });

    const userSchema = z.object({
        token_user: z.string(),
        name_user: z.string(),
        email_user: z.string(),
        password_user: z.string(),
    });



    app.post('/users/cadastro', async (request) => {
        try {
            const { name_user, email_user, password_user } = userSchema.parse(request.body);

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password_user, saltRounds);

            const token_user = uuidv4();

            const newUser = await prisma.user.create({
                data: {
                    token_user,
                    name_user,
                    email_user,
                    password_user: hashedPassword,
                }
            });

            const token = jwt.sign({ userId: newUser.id_user }, 'EstaEhUmaChaveMuitoSecreta123!@#');

            return {
                message: 'Usuario criado com sucesso',
                userId: newUser.id_user,
                token,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code == 'P2002') {
                return {
                    error: 'O email fornecido já existe. Por favor, escolha um email diferente.'
                };
            }

            console.error('Erro ao criar usuário', error);
            throw new Error('Erro ao criar o usuário');
        }
    });
}