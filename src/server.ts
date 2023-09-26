import fastify from 'fastify';
import { usersRoutes } from './routes/users';

const app = fastify();
app.register(usersRoutes, { prefix: '/' });

app.listen({
    port: 3333,
}).then(()=> {
    console.log('HTTP server rodando na http://localhost:3333')
})