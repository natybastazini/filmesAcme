/**********************************************************************
 * Objetivo: Arquivo responsável pela interação entre o APP e a model, que teremos 
 * todas as tratativas e regra de negócio para o CRUD de filmes.
 * Data: 30/01/2024.
 * Autor: Natália Bastazini.
 * Versao: 1.0
 **********************************************************************/

//Import de arquivos de configurações do projeto.
const message = require('../modulo/config.js')

//Import do arquivo DAO para manipular dados do BD.
const filmesDAO = require('../model/DAO/filme.js')
const generoDAO = require('../model/DAO/genero.js')
const classificacaoDAO = require('../model/DAO/classificacao.js')
const atorDAO = require('../model/DAO/ator.js')
const diretorDAO = require('../model/DAO/diretor.js')


//Função para inserir um novo filme no banco de dados.

const setInserirNovoFilme = async function (dadosFilme, contentType){

    try {
            if(String(contentType).toLowerCase() == 'application/json'){
                let dadosAtualizados = {}
            
            // Validação para verificar campos obrigatórios e consistencia de dados
            if( dadosFilme.nome             == '' || dadosFilme.nome            == undefined || dadosFilme.nome.length              > 80    ||
                dadosFilme.sinopse          == '' || dadosFilme.sinopse         == undefined || dadosFilme.sinopse.length           > 65000 ||
                dadosFilme.duracao          == '' || dadosFilme.duracao         == undefined || dadosFilme.duracao.length           > 8     ||
                dadosFilme.data_lancamento  == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento.length   > 10    ||
                dadosFilme.foto_capa        == '' || dadosFilme.foto_capa       == undefined || dadosFilme.foto_capa.length         > 200   ||
                dadosFilme.valor_unitario.length > 8 
            ){
                return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorreto
            }else{
                let dadosValidated = false

                //Validação de digitação para a data de relançamento que não é campo obrigatório
                if(     dadosFilme.data_relancamento != null && 
                        dadosFilme.data_relancamento != undefined && 
                        dadosFilme.data_relancamento != ""
                    ){
                        if(dadosFilme.data_relancamento.length != 10)
                            return message.ERROR_REQUIRED_FIELDS // 400 Campos origatórios / Incorretos
                        else
                            dadosValidated = true // Se a dataestiver exatamente 10 char
                }else{
                    //Variável para validar se poderemos chamar o DAO 
                    dadosValidated = true // Se a data não existir nos dados
                }

            
                if(dadosValidated){
                    
                        //Encaminha os dados para o DAO inserir no BD
                    let novoFilme = await filmesDAO.insertFilme(dadosFilme)

                    //Validação para verificar se os dados foram inseridos pelo DAO no BD
                    if(novoFilme){
                       
                    let idFilme = await filmesDAO.selectUltimoId()                     

                        dadosFilme.id = Number(idFilme[0].id)
                        //Cria o padrão JSON para retorno dos dados criados no BD
                        dadosAtualizados.status         = message.SUCESS_CREATED_ITEM.status;
                        dadosAtualizados.status_code    = message.SUCESS_CREATED_ITEM.status_code;
                        dadosAtualizados.message        = message.SUCESS_CREATED_ITEM.message
                        dadosAtualizados.filme          = dadosFilme
            
                       
                        return dadosAtualizados // 201

                    }else{
                        return message.ERROR_INTERNAL_SERVER_DB // 500 Erro na camada do DAO
                    }
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE // 415 Erro no content-type da requisição
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER // 500 Erro na camada de negócio da aplicação
    }
}

//Função para atualizar um filme existente.

const setAtualizarFilme = async (id,  contentType, dadosFilme) =>{
    try {

        let idFilme = id; 

        if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
            return message.ERROR_INVALID_ID
        } else {

            if(String(contentType).toLowerCase() == 'application/json'){
                let resultDadosFilme = {}
               
                // Validação para verificar campos obrigatórios e consistencia de dados
                if( dadosFilme.nome             == '' || dadosFilme.nome            == undefined || dadosFilme.nome.length              > 80    ||
                    dadosFilme.sinopse          == '' || dadosFilme.sinopse         == undefined || dadosFilme.sinopse.length           > 65000 ||
                    dadosFilme.duracao          == '' || dadosFilme.duracao         == undefined || dadosFilme.duracao.length           > 8     ||
                    dadosFilme.data_lancamento  == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento.length   > 10    ||
                    dadosFilme.foto_capa        == '' || dadosFilme.foto_capa       == undefined || dadosFilme.foto_capa.length         > 200   ||
                    dadosFilme.valor_unitario.length > 8 
                ){
                    return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorreto
                }else{
                    let dadosValidated = false

                    //Validação de digitação para a data de relançamento que não é campo obrigatório
                    if(     dadosFilme.data_relancamento != null && 
                            dadosFilme.data_relancamento != undefined && 
                            dadosFilme.data_relancamento != ""
                        ){
                            if(dadosFilme.data_relancamento.length != 10)
                                return message.ERROR_REQUIRED_FIELDS // 400 Campos origatórios / Incorretos
                            else
                                dadosValidated = true
                    }else{
                        //Variável para validar se poderemos chamar o DAO 
                        dadosValidated = true // Se a data não existir nos dados
                    }

                    console.log(dadosValidated)

                    if(dadosValidated){
                        
                            //Encaminha os dados para o DAO inserir no BD
                        let novoFilme = await filmesDAO.updateFilme(id, dadosFilme)

                        console.log(novoFilme)

                        //Validação para verificar se os dados foram inseridos pelo DAO no BD
                        if(novoFilme){

                            let idFilme = await filmesDAO.selectByIdFilme(id)
                            
                            dadosFilme.id = Number(idFilme[0].id)

                            //Cria o padrão JSON para retorno dos dados criados no BD
                            resultDadosFilme.status         = message.SUCESS_UPDATED_ITEM.status;
                            resultDadosFilme.status_code    = message.SUCESS_UPDATED_ITEM.status_code;
                            resultDadosFilme.message        = message.SUCESS_UPDATED_ITEM.message
                            resultDadosFilme.filme          = dadosFilme
                
                            return resultDadosFilme // 201
                        }else{
                            return message.ERROR_INTERNAL_SERVER_DB // 500 Erro na camada do DAO
                        }
                    }
                }
            }else{
                return message.ERROR_CONTENT_TYPE // 415 Erro no content-type da requisição
            }
        }     
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER // 500 Erro na camada de negócio da aplicação
    }
}

//Função para excluir um filme existente.

const setExcluirFilme = async function(id){

    try { 

        let idFilme = id
   
        if(idFilme == '' || idFilme == undefined || isNaN(idFilme)){
            return message.ERROR_INVALID_ID
        }else{
            

            let chamarConst = await filmesDAO.selectByIdFilme(idFilme)

            if(chamarConst.length > 0){

                let dadosFilme = await filmesDAO.deleteFilme(id)
              
                if(dadosFilme){

                return message.SUCESS_DELETED_ITEM //200
                }else{
                    return message.SUCESS_DELETED_ITEM //201
                }
            }else{
                return message.ERROR_NOT_FOUND //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

//Função para retornar todos os filmes do banco de dados.

const getListarFilmes = async function(){

    //Cria uma variável do tipo JSON.
    let filmesJSON = {}

    //Chama a função do DAO para buscar os dados no BD.
    let dadosFilmes = await filmesDAO.selectAllFilmes()

    //Verifica se existem dados retornados do DAO.
    if(dadosFilmes){
        
        const promisse = dadosFilmes.map(async(filme)=>{
            let generoJSON = await generoDAO.selectByIdGeneroFilme(filme.id)
            let classificacaoJSON = await classificacaoDAO.selectByIdClassificacao(filme.id)
            filme.classificacao = classificacaoJSON
            let atorJSON = await atorDAO.selectByIdAtor(filme.id)
            filme.ator = atorJSON
            let diretorJSON = await diretorDAO.selectByIdDiretor(filme.id)
            filme.diretor = diretorJSON
            if(generoJSON.length > 0){
                filme.genero = generoJSON
            }
        })

        

        await Promise.all(promisse)

        //Montando o JSON para retornar para o APP.
        filmesJSON.filmes = dadosFilmes
        filmesJSON.quantidade = dadosFilmes.length
        filmesJSON.status_code = 200

        //Retorna o JSON montado.
        return filmesJSON
    }else{
        //Return false quando não houverem dados.
        return false
    }
}

//Função para buscar um filme pelo ID.

const getBuscarFilme = async function(id){
    //Recebe o Id do filme.
    let idFilme = id
    //Variável para criar o JSON de retorno do filme.
    let filmeJSON = {}

    //Validação para ID vazio, indefinido ou não numérico.
    if(idFilme == '' || idFilme == undefined || isNaN(idFilme)){
        return message.ERROR_INVALID_ID
    }else{

        //Solicita para o DAO a busca do filme pelo ID.
        let dadosFilme = await filmesDAO.selectByIdFilme(id)

        //Validação para verificar se existem dados encontrados
        if(dadosFilme){

            let generoJSON = await generoDAO.selectByIdGeneroFilme(idFilme)
            let classificacaoJSON = await classificacaoDAO.selectByIdClassificacao(idFilme)
            let atorJSON = await atorDAO.selectByIdAtor(idFilme)
            let diretorJSON = await diretorDAO.selectByIdDiretor(idFilme)
           
            if(generoJSON.length > 0){
                dadosFilme[0].genero = generoJSON
            }
            if(classificacaoJSON.length > 0){
                dadosFilme[0].classificacao = classificacaoJSON
            }
            if(atorJSON.length > 0){
                dadosFilme[0].ator = atorJSON
            }
            if(diretorJSON.length > 0){
                dadosFilme[0].diretor = diretorJSON
            }



            //Validação para verificar se existem dados de retorno
            if(dadosFilme.length > 0){

            filmeJSON.filme = dadosFilme
            filmeJSON.status_code = 200

            return filmeJSON //200
            }else{
                return message.ERROR_NOT_FOUND //400
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }
}

//Função para buscar um filme pelo nome.

const  getBuscarFilmeNome = async function(nome){
    let nomeFilme = nome
    let filmesJSON = {}

    if(nomeFilme == '' || nomeFilme == undefined){
        return message.ERROR_INVALID
    }else{
        let dadosFilme = await filmesDAO.selectByNomeFilme(nomeFilme)

        if(dadosFilme){
            if(dadosFilme.length > 0){
                filmesJSON.filme = dadosFilme
                filmesJSON.status_code = 200

                return filmesJSON
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB
        }

    }
        
}

module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme,
    getBuscarFilmeNome
}
