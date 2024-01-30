/**********************************************************************
 * Objetivo: .
 * Data: 23/01/2024.
 * Autor: Natalia Bastazini.
 * Versao: 1.0
 **********************************************************************/

/**********************************************************************
 * Para realizar a conexão com o banco de dados precisamos utilizar uma dependencia:
 *      - SEQUELIZE ORM.
 *      - PRISMA ORM.
 *      - FASTFY ORM.
 * 
 * Prisma - parra utilizar o prisma precisamos instalar as seguintes dependencias.
 *      npm install prisma --save
 *      npm install @prisma/client --save
 * 
 *      Após a instalação do prisma, devemos rodar o comando abaxo para inicializar 
 *      o prisma:
 *      npx prisma init
 **********************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use((request, response, next) => {
    // Configura quem poderá fazer requisições na API (* - libera para todos | IP restringe o acesso)
    response.header('Access-Control-Allow-Origin', '*')
    // Configura os métodos que poderão ser utilizdos na API (GET, POST, PUT, e DELETE)
    response.header('Access-Control-Allow-Methods', 'GET')

    app.use(cors())
    next()
})

// PRIMEIRO ENDPOINT

// app.get('/v1/filmesacme', cors(), async function(request, response, next){
//         let controleFilmes = require('./controller/main');
//         let dadosFilmes = controleFilmes.listarDados();
    
//         console.log(dadosFilmes)
//         response.json(dadosFilmes);
//         response.status(200);
// })

// app.listen(8080, function(){
//     console.log('API funcionando e aguardando requisições!!!')
// })

// SEGUNDO ENDPOINT

app.get('/v1/filmesacme/:id', cors(), async function(request, response, next){

    let idFilme = request.params.id

    let controleFilmes = require('./controller/main');
    let dadosFilmes = controleFilmes.listarDadosId(idFilme);

    console.log(dadosFilmes)
    response.json(dadosFilmes);
    response.status(200);
})

app.listen(8080, function(){
console.log('API funcionando e aguardando requisições!!!')
})