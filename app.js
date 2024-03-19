/**********************************************************************
 * Objetivo: .
 * Data: 23/01/2024.
 * Autor: Natália Bastazini.
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

//Import das bibliotecas do projeto
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Cria um objeto app tendo como referência a classe do express
const app = express()

app.use((request, response, next) => {
    // Configura quem poderá fazer requisições na API (* - libera para todos | IP restringe o acesso)
    response.header('Access-Control-Allow-Origin', '*')
    // Configura os métodos que poderão ser utilizdos na API (GET, POST, PUT, e DELETE)
    response.header('Access-Control-Allow-Methods', 'GET')

    app.use(cors())
    next()
})

//Cria um objeto do tipo JSON para receber os dados via body nas requisições POST ou PUT
const bodyParserJSON = bodyParser.json()

/********************************** Imports e arquivos e bibioteca ************************************/
const controllerFilmes = require('./controller/controller_filme.js')
const { warnEnvConflicts } = require('@prisma/client/runtime/library.js')
/**********************************************************************/

// PRIMEIRO ENDPOINT

app.get('/v1/acmefilmes', cors(), async function(request, response, next){
        let controleFilmes = require('./controller/main')
        let dadosFilmes = controleFilmes.listarDados()
    
        console.log(dadosFilmes)
        response.status(200)
        response.json(dadosFilmes)
        
})

//ENDPOINT V2

app.get('/v2/acmefilmes/filmes', cors(), async function(request, response, next){
    let dadosFilmes = await controllerFilmes.getListarFilmes()

    if(dadosFilmes){
        response.json(dadosFilmes)
        response.status(200)
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status(404)
    }
})

// SEGUNDO ENDPOINT

app.get('/v1/filmesacme/:id', cors(), async function(request, response, next){

    let idFilme = request.params.id

    let controleFilmes = require('./controller/main')
    let dadosFilmes = controleFilmes.listarDadosId(idFilme)

    console.log(dadosFilmes.status_code)
    response.json(dadosFilmes)
    // response.status(200)
})

// TERCEIRO ENDPOINT
app.get('/v1/acmefilmes/filmes/filtro', cors(), async function(request, response, next){
    let nomeFilme = request.query.nome

    console.log(nomeFilme)

    let dadosFilme = await controllerFilmes.getBuscarFilmeNome(nomeFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})


// ENDPOINT: Retorna os dados do filme filtrando pelo ID
app.get('/v2/acmefilmes/filme/:id', cors(), async function(request, response, next){
    //Recebe o id da requisição do filme
    let idFilme = request.params.id

    //Solicita para a controller o filme filtrando pelo ID
    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

//ENDPOINT: Inserir novos filmes no Banco de Dados
    //Não esquecer de colocar o bodyParserJSON que é quem define o formato de chegada dos dados
    //Obs: esse objeto foi criado no iício do projeto

app.post('/v2/acmefilmes/filme', cors(), bodyParserJSON, async function(request, response, next){

    //Recebe o content-type da requisição (a API deve receber somente application/JSON)
    let contentType = request.headers['content-type']

    console.log(contentType)

    //Recebe os dados encaminhados na requisição no body (JSON)
    let dadosBody = request.body

    //Encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

//ENDPOINT: Deletar um filme do Banco de Dados
app.delete('/v2/acmefilmes/filmes/:id', cors(), async function(request, response, next){

    let idFilme = request.params.id
    
    let dadosFilme = await controllerFilmes.setExcluirFilme(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)

})

app.get('/v2/acmefilmes/')

//Executa a API e faz ela ficar aguardando requisições
app.listen(8080, function(){
console.log('API funcionando e aguardando requisições!!!')
})