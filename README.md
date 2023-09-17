# Esse é um projeto para fins de estudo e futuras consultas

# Tecnologias utilizadas:
    - Typescript
    - Fastify
    - Prisma

###### Guia Passo a Passo: ######
 Criando o projeto: npm init -y
 Instalando o TypeScript: npm i typescript -D
 Instalando a tipagem do TypeScript: npm i @types/node -D
 Configurando o TS no Node: npx tsc --init
 Alterar a linha do arquivo tsconfig.json: target: 'es2016' para 'es2020'
 Crie a pasta src
 Crie a pasta src/server.ts
 Converter o código de TS para JS: npm i tsx -D
 Criar um script: "dev": "tsx watch src/server.ts"
 Para executar o script digite: npm run dev
 Instalar o servidor web fastify: npm i fastify


###### Guia Prisma: ######
 Iniciando o prisma: npx prisma init

 Após criar o model no arquivo prisma/schema.prisma use o comando npx prisma migrate dev para subir a nova tabela para o banco

 O banco é configurado no arquivo .env: DATABASE_URL="mysql://root:@localhost:3306/bd_prisma?"

 Para visualizar o banco de dados e a tabela User utilize o programa Beekeeper studio ou digite o comando npx prisma studio. Você também pode vizualiza o banco no próprio SGBD MySql workbench ou qualque outro banco Relacional.



###### Opções de Parametros Get ######
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



