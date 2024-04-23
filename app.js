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
 * 
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
const controllerAtores = require('./controller/controller_ator.js')
const controllerDiretores = require('./controller/controller_diretor.js')
const controllerGenero = require('./controller/controller_genero.js')
const controllerClassificacao = require('./controller/controller_classificacao.js')
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

//ENDPOINT V2!!

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

// TERCEIRO ENDPOINT Filtra pelo nome

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
app.delete('/v2/acmefilmes/filme/:id', cors(), async function(request, response, next){

    let idFilme = request.params.id
    
    let dadosFilme = await controllerFilmes.setExcluirFilme(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)

})

//ENDPOINT: Update filme do Banco de Dados
app.put('/v2/acmefilmes/filme/atualizado/:id', cors(), bodyParserJSON, async function(request, response, next){

    let idFilme = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    
    let dadosAtualizados = await controllerFilmes.setAtualizarFilme(idFilme,  contentType, dadosBody)
    
    response.status(dadosAtualizados.status_code);
    response.json(dadosAtualizados)
})

/**********************************************************************/

//ENDPOINT ATOR

// Listar todos os atores inseridos no banco de dados.
app.get('/v2/acmefilmes/atores', cors(), async function(request, response, next){
    let dadosAtor = await controllerAtores.getListarAtores()

    if(dadosAtor){
        response.json(dadosAtor)
        response.status(200)
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status(404)
    }
})

// Busca o ator pelo ID.
app.get('/v2/acmefilmes/ator/:id', cors(), async function(request, response, next){
    let idAtor = request.params.id

    let dadosAtor = await controllerAtores.getAtor(idAtor)

    response.status(dadosAtor.status_code)
    response.json(dadosAtor)
})

// Busca o ator pelo nome.
app.get('/v1/acmefilmes/atores/filtro', cors(), async function(request, response, next){
    let nomeAtor = request.query.nome

    console.log(nomeAtor)

    let dadosAtor = await controllerAtores.getAtorNome(nomeAtor)

    response.status(dadosAtor.status_code)
    response.json(dadosAtor)
})

// Inserir um novo ator no banco de dados.
app.post('/v2/acmefilmes/ator', cors(), bodyParserJSON, async function(request, response, next){

    //Recebe o content-type da requisição (a API deve receber somente application/JSON)
    let contentType = request.headers['content-type']

    console.log(contentType)

    //Recebe os dados encaminhados na requisição no body (JSON)
    let dadosBody = request.body

    //Encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerAtores.setInserirNovoAtor(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

//ENDPOINT: Deletar um ator do Banco de Dados
app.delete('/v2/acmefilmes/ator/:id', cors(), async function(request, response, next){

    let idAtor = request.params.id
    
    let dadosAtor = await controllerAtores.setExcluirAtor(idAtor)

    response.status(dadosAtor.status_code)
    response.json(dadosAtor)

})

//ENDPOINT: Update ator do Banco de Dados
app.put('/v2/acmefilmes/ator/:id', cors(), bodyParserJSON, async function(request, response, next){

    let idAtor = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    
    let dadosAtualizados = await controllerAtores.setAtualizarAtor(dadosBody, contentType, idAtor)
    
    response.status(dadosAtualizados.status_code);
    response.json(dadosAtualizados)
})

/**********************************************************************/

//ENDPOINT DIRETOR

// Listar todos os diretores inseridos no banco de dados.
app.get('/v2/acmefilmes/diretores', cors(), async function(request, response, next){
    let dadosDiretor = await controllerDiretores.getListarDiretores()

    if(dadosDiretor){
        response.json(dadosDiretor)
        response.status(200)
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status(404)
    }
})

// Busca o diretor pelo ID.
app.get('/v2/acmefilmes/diretor/:id', cors(), async function(request, response, next){
    let idDiretor = request.params.id

    let dadosDiretor = await controllerDiretores.getDiretorID(idDiretor)

    response.status(dadosDiretor.status_code)
    response.json(dadosDiretor)
})

// Busca o diretor pelo nome.
app.get('/v1/acmefilmes/diretores/filtro', cors(), async function(request, response, next){
    let nomeDiretor = request.query.nome

    console.log(nomeDiretor)

    let dadosDiretor = await controllerDiretores.getDiretorNome(nomeDiretor)

    response.status(dadosDiretor.status_code)
    response.json(dadosDiretor)
})

//ENDPOINT: Inserir novos diretores no Banco de Dados
    //Não esquecer de colocar o bodyParserJSON que é quem define o formato de chegada dos dados
    //Obs: esse objeto foi criado no iício do projeto

    app.post('/v2/acmefilmes/diretor', cors(), bodyParserJSON, async function(request, response, next){

        //Recebe o content-type da requisição (a API deve receber somente application/JSON)
        let contentType = request.headers['content-type']
    
        console.log(contentType)
    
        //Recebe os dados encaminhados na requisição no body (JSON)
        let dadosBody = request.body
    
        //Encaminha os dados da requisição para a controller enviar para o BD
        let resultDados = await controllerDiretores.setInserirNovoDiretor(dadosBody, contentType)
    
        response.status(resultDados.status_code)
        response.json(resultDados)
    })
    
    //ENDPOINT: Deletar um diretor do Banco de Dados
    app.delete('/v2/acmefilmes/diretor/:id', cors(), async function(request, response, next){
    
        let idDiretor = request.params.id
        
        let dadosDiretor = await controllerDiretores.setExcluirDiretor(idDiretor)
    
        response.status(dadosDiretor.status_code)
        response.json(dadosDiretor)
    
    })
    
    //ENDPOINT: Update diretor do Banco de Dados
    app.put('/v2/acmefilmes/diretor/atualizado/:id', cors(), bodyParserJSON,  async function(request, response, next){
    
        let idDiretor = request.params.id
        let contentType = request.headers['content-type']
        let dadosBody = request.body
        
        let dadosAtualizados = await controllerDiretores.setAtualizarDiretor(dadosBody, contentType, idDiretor)
        
        response.status(dadosAtualizados.status_code);
        response.json(dadosAtualizados)
    })

/**********************************************************************/

// ENDPOINT gênero

// Listar todos os gêneros inseridos no banco de dados.
app.get('/v2/acmefilmes/generos', cors(), async function(request, response, next){
    let dadosGenero = await controllerGenero.getListarGeneros()

    if(dadosGenero){
        response.json(dadosGenero)
        response.status(200)
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status(404)
    }
})

// Busca o gênero pelo ID.
app.get('/v2/acmefilmes/genero/:id', cors(), async function(request, response, next){
    let idGenero = request.params.id

    let dadosGenero = await controllerGenero.getBuscarGenero(idGenero)

    response.status(dadosGenero.status_code)
    response.json(dadosGenero)
})

// Busca o gênero pelo nome.
app.get('/v1/acmefilmes/generos/filtro', cors(), async function(request, response, next){
    let nomeGenero = request.query.nome

    console.log(nomeGenero)

    let dadosGenero = await controllerGenero.getBuscarGeneroNome(nomeGenero)

    response.status(dadosGenero.status_code)
    response.json(dadosGenero)
})

//ENDPOINT: Inserir novos gêneros no Banco de Dados
    //Não esquecer de colocar o bodyParserJSON que é quem define o formato de chegada dos dados
    //Obs: esse objeto foi criado no iício do projeto

    app.post('/v2/acmefilmes/genero', cors(), bodyParserJSON, async function(request, response, next){

        //Recebe o content-type da requisição (a API deve receber somente application/JSON)
        let contentType = request.headers['content-type']
    
        console.log(contentType)
    
        //Recebe os dados encaminhados na requisição no body (JSON)
        let dadosBody = request.body
    
        //Encaminha os dados da requisição para a controller enviar para o BD
        let resultDados = await controllerGenero.setInserirNovoGenero(dadosBody, contentType)
    
        response.status(resultDados.status_code)
        response.json(resultDados)
    })

//ENDPOINT: Deletar um gênero do Banco de Dados
app.delete('/v3/acmefilmes/genero/:id', cors(), async function(request, response, next){

    let idGenero = request.params.id
    
    let dadosGenero = await controllerGenero.setExcluirGenero(idGenero)

    response.status(dadosGenero.status_code)
    response.json(dadosGenero)

})

//ENDPOINT: Update gênero do Banco de Dados
app.put('/v2/acmefilmes/genero/atualizado/:id', cors(), bodyParserJSON, async function(request, response, next){

    let idGenero = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    
    let dadosAtualizados = await controllerGenero.setAtualizarGenero(idGenero, contentType, dadosBody)
    
    response.status(dadosAtualizados.status_code);
    response.json(dadosAtualizados)
})

/**********************************************************************/

// ENDPOINT Classificação

// Listar todos os classificação inseridos no banco de dados.
app.get('/v2/acmefilmes/classificacao', cors(), async function(request, response, next){
    let dadosClassificacao = await controllerClassificacao.getListarClassificacao()

    if(dadosClassificacao){
        response.json(dadosClassificacao)
        response.status(200)
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status(404)
    }
})

// Busca o classificação pelo nome.
app.get('/v2/acmefilmes/classificacao/filtro', cors(), async function(request, response, next){
    let nomeClassificacao = request.query.nome

    console.log(nomeClassificacao)

    let dadosClassificacao = await controllerClassificacao.getBuscarClassificacaoNome(nomeClassificacao)

    response.status(dadosClassificacao.status_code)
    response.json(dadosClassificacao)
})

// Busca o classificação pelo ID.
app.get('/v2/acmefilmes/classificacao/:id', cors(), async function(request, response, next){
    let idClassificacao = request.params.id

    let dadosClassificacao = await controllerClassificacao.getBuscarClassificacao(idClassificacao)

    response.status(dadosClassificacao.status_code)
    response.json(dadosClassificacao)
})



//ENDPOINT: Inserir novos classificação no Banco de Dados
    //Não esquecer de colocar o bodyParserJSON que é quem define o formato de chegada dos dados
    //Obs: esse objeto foi criado no iício do projeto

    app.post('/v2/acmefilmes/classificacao', cors(), bodyParserJSON, async function(request, response, next){

        //Recebe o content-type da requisição (a API deve receber somente application/JSON)
        let contentType = request.headers['content-type']
    
        console.log(contentType)
    
        //Recebe os dados encaminhados na requisição no body (JSON)
        let dadosBody = request.body
    
        //Encaminha os dados da requisição para a controller enviar para o BD
        let resultDados = await controllerClassificacao.setInserirNovaClassificacao(dadosBody, contentType)
    
        response.status(resultDados.status_code)
        response.json(resultDados)
    })

//ENDPOINT: Deletar um classificação do Banco de Dados
app.delete('/v2/acmefilmes/classificacao/:id', cors(), async function(request, response, next){

    let idClassificacao = request.params.id
    
    let dadosClassificacao = await controllerClassificacao.setExcluirClassificacao(idClassificacao)

    response.status(dadosClassificacao.status_code)
    response.json(dadosClassificacao)

})

//ENDPOINT: Update classificação do Banco de Dados
app.put('/v2/acmefilmes/classificacao/atualizado/:id', cors(), bodyParserJSON, async function(request, response, next){

    let idClassificacao = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    
    let dadosAtualizados = await controllerClassificacao.setAtualizarClassificacao( idClassificacao, contentType,dadosBody)
    
    response.status(dadosAtualizados.status_code);
    response.json(dadosAtualizados)
})


//Executa a API e faz ela ficar aguardando requisições
app.listen(8080, function(){
console.log('API funcionando e aguardando requisições!!!')
})