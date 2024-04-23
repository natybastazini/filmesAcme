/**********************************************************************
 * Objetivo: Criar  interação com o banco de dados MySQL de diretors.
 * Data: 16/04/2024.
 * Autor: Natália Bastazini.
 * Versao: 1.0
 **********************************************************************/

//Import de arquivos de configurações do projeto.
const message = require('../modulo/config.js')

//Import do arquivo DAO para manipular dados do BD.
const diretoresDAO = require('../model/DAO/diretor.js')

//Função para inserir um novo diretor no banco de dados.

const setInserirNovoDiretor = async function (dadosDiretor, contentType){

    try {
            if(String(contentType).toLowerCase() == 'application/json'){
                let dadosAtualizados = {}
            
            // Validação para verificar campos obrigatórios e consistencia de dados
            if( dadosDiretor.nome             == '' || dadosDiretor.nome            == undefined || dadosDiretor.nome.length              > 80    ||
                dadosDiretor.data_nascimento  == '' || dadosDiretor.data_nascimento == undefined || dadosDiretor.data_nascimento.length   > 10    ||
                dadosDiretor.foto             == '' || dadosDiretor.foto            == undefined || dadosDiretor.foto.length              > 200   ||
                dadosdiretor.biografia        == '' || dadosdiretor.biografia       == undefined || dadosdiretor.biografia.length         > 65000
            ){
                return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorreto
            }else{
                let dadosValidated = false

                //Validação de digitação para a data de falecimento que não é campo obrigatório
                if(     dadosDiretor.data_falecimento != null && 
                        dadosDiretor.data_falecimento != undefined && 
                        dadosDiretor.data_falecimento != ""
                    ){
                        if(dadosDiretor.data_falecimento.length != 10)
                            return message.ERROR_REQUIRED_FIELDS // 400 Campos origatórios / Incorretos
                        else
                            dadosValidated = true // Se a dataestiver exatamente 10 char
                }else{
                    //Variável para validar se poderemos chamar o DAO 
                    dadosValidated = true // Se a data não existir nos dados
                }

            
                if(dadosValidated){
                    
                        //Encaminha os dados para o DAO inserir no BD
                    let novoDiretor = await diretoresDAO.insertDiretor(dadosDiretor)

                    //Validação para verificar se os dados foram inseridos pelo DAO no BD
                    if(novoDiretor){
                       
                    let idDiretor = await diretoresDAO.selectUltimoId()                     

                        dadosDiretor.id = Number(idDiretor[0].id)
                        //Cria o padrão JSON para retorno dos dados criados no BD
                        dadosAtualizados.status         = message.SUCESS_CREATED_ITEM.status;
                        dadosAtualizados.status_code    = message.SUCESS_CREATED_ITEM.status_code;
                        dadosAtualizados.message        = message.SUCESS_CREATED_ITEM.message
                        dadosAtualizados.diretor        = dadosDiretor
            
                       
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

//Função para atualizar um diretor existente.

const setAtualizarDiretor = async (id,  contentType, dadosDiretor) =>{
    try {

        let idDiretor = id; 
        console.log(idDiretor)

        if (idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)) {
            return message.ERROR_INVALID_ID
        } else {

            if(String(contentType).toLowerCase() == 'application/json'){
                let resultDadosDiretor = {}
                
               
                // Validação para verificar campos obrigatórios e consistencia de dados
                if( dadosDiretor.nome             == '' || dadosDiretor.nome            == undefined || dadosDiretor.nome.length              > 80    ||
                    dadosDiretor.data_nascimento  == '' || dadosDiretor.data_nascimento == undefined || dadosDiretor.data_nascimento.length   > 10    ||
                    dadosDiretor.foto             == '' || dadosDiretor.foto            == undefined || dadosDiretor.foto.length              > 200   ||
                    dadosdiretor.biografia        == '' || dadosdiretor.biografia       == undefined || dadosdiretor.biografia.length         > 65000 
                ){
                    return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorreto
                }else{
                    let dadosValidated = false

                    //Validação de digitação para a data de relançamento que não é campo obrigatório
                    if(     dadosDiretor.data_falecimento != null && 
                            dadosDiretor.data_falecimento != undefined && 
                            dadosDiretor.data_falecimento != ""
                        ){
                            if(dadosDiretor.data_falecimento.length != 10)
                                return message.ERROR_REQUIRED_FIELDS // 400 Campos origatórios / Incorretos
                            else
                                dadosValidated = true
                    }else{
                        //Variável para validar se poderemos chamar o DAO 
                        dadosValidated = true // Se a data não existir nos dados
                    }

                    if(dadosValidated){
                        
                            //Encaminha os dados para o DAO inserir no BD
                        let novoDiretor = await diretoresDAO.updateDiretor(dadosDiretor)

                        //Validação para verificar se os dados foram inseridos pelo DAO no BD
                        if(novoDiretor){

                            let idDiretor = await diretoresDAO.selectByIdDiretor(id)
                            
                            dadosDiretor.id = Number(idDiretor[0].id)

                            //Cria o padrão JSON para retorno dos dados criados no BD
                            resultDadosDiretor.status         = message.SUCESS_UPDATED_ITEM.status;
                            resultDadosDiretor.status_code    = message.SUCESS_UPDATED_ITEM.status_code;
                            resultDadosDiretor.message        = message.SUCESS_UPDATED_ITEM.message
                            resultDadosDiretor.Diretor        = dadosDiretor
                
                            return resultDadosDiretor // 201
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

//Função para excluir um diretor existente.

const setExcluirDiretor = async function(id){

    try { 

        let idDiretor = id
   
        if(idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)){
            return message.ERROR_INVALID_ID
        }else{
            

            let chamarConst = await diretoresDAO.selectByIdDiretor(idDiretor)

            if(chamarConst.length > 0){

                let dadosDiretor = await diretoresDAO.deleteDiretor(id)
              
                if(dadosDiretor){

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

//Função para retornar todos os diretores do banco de dados.

const getListarDiretores = async function(){

    //Cria uma variável do tipo JSON.
    let diretoresJSON = {}

    //Chama a função do DAO para buscar os dados no BD.
    let dadosDiretores = await diretoresDAO.selectAllDiretores()

    //Verifica se existem dados retornados do DAO.
    if(dadosDiretores){
        //Montando o JSON para retornar para o APP.
        diretoresJSON.diretores = dadosDiretores
        diretoresJSON.quantidade = dadosDiretores.length
        diretoresJSON.status_code = 200

        //Retorna o JSON montado.
        return diretoresJSON
    }else{
        //Return false quando não houverem dados.
        return false
    }
}

//Função para buscar um diretor pelo ID.

const getBuscarDiretor = async function(id){
    //Recebe o Id do Diretor.
    let idDiretor = id
    //Variável para criar o JSON de retorno do Diretor.
    let diretorJSON = {}

    //Validação para ID vazio, indefinido ou não numérico.
    if(idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)){
        return message.ERROR_INVALID_ID
    }else{

        //Solicita para o DAO a busca do Diretor pelo ID.
        let dadosDiretor = await diretoresDAO.selectByIdDiretor(id)

        //Validação para verificar se existem dados encontrados
        if(dadosDiretor){
            //Validação para verificar se existem dados de retorno
            if(dadosDiretor.length > 0){

            diretorJSON.diretor = dadosDiretor
            diretorJSON.status_code = 200

            return diretorJSON //200
            }else{
                return message.ERROR_NOT_FOUND //400
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }
}

//Função para buscar um Diretor pelo nome.

const  getBuscarDiretorNome = async function(nome){
    let nomeDiretor = nome
    let diretoresJSON = {}

    if(nomeDiretor == '' || nomeDiretor == undefined){
        return message.ERROR_INVALID
    }else{
        let dadosDiretor = await diretoresDAO.selectByNomeDiretor(nomeDiretor)

        if(dadosDiretor){
            if( dadosDiretor.length > 0){
                diretoresJSON.Diretor = dadosDiretor
                diretoresJSON.status_code = 200

                return diretoresJSON
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB
        }

    }
        
}


module.exports = {
    getListarDiretores,
    getBuscarDiretor,
    getBuscarDiretorNome,
    setInserirNovoDiretor,
    setAtualizarDiretor,
    setExcluirDiretor
}