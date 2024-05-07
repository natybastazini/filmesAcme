/**********************************************************************
 * Objetivo: Arquivo responsável pela interação entre o APP e a model, que teremos 
 * todas as tratativas e regra de negócio para o CRUD de atores.
 * Data: 16/04/2024.
 * Autor: Natália Bastazini.
 * Versao: 1.0
 **********************************************************************/

const message = require('../modulo/config.js')
const atorDAO = require('../model/DAO/ator.js')
const sexoDAO = require('../model/DAO/sexo.js')
const nacionalidadeDAO = require('../model/DAO/nacionalidade.js')

//Função para retornar todos os atores do banco de dados.

const getListarAtores = async function(){

    let atoresJSON = {}
    let dadosAtor = await atorDAO.selectAllAtores()

    if(dadosAtor){

        const promisse = dadosAtor.map(async(ator)=>{
            let sexoJSON = await sexoDAO.selectByIdSexo(ator.sexo_id)
            ator.sexo = sexoJSON
            let nacionalidadeJSON = await nacionalidadeDAO.selectByIdNacionalidadeAtor(ator.id)
           
            if(nacionalidadeJSON.length > 0){ 
                ator.nacionalidade = nacionalidadeJSON
            }
        })

        await Promise.all(promisse)

        atoresJSON.ator = dadosAtor

        atoresJSON.quantidade = dadosAtor.length
        atoresJSON.status_code = 200

        return atoresJSON
    }else{
        return false
    }
}

//Função para buscar um ator pelo ID.

const getAtor = async function(id){
    //Recebe o Id do ator.
    let idAtor = id
    //Variável para criar o JSON de retorno do ator.
    let atoresJSON = {}

    //Validação para ID vazio, indefinido ou não numérico.
    if(idAtor == '' || idAtor == undefined || isNaN(idAtor)){
        return message.ERROR_INVALID_ID
    }else{

        //Solicita para o DAO a busca do ator pelo ID.
       
        let dadosAtor = await atorDAO.selectByIdAtor(id)
        
        //Validação para verificar se existem dados encontrados
        if(dadosAtor){
            
            //Validação para verificar se existem dados de retorno
            if(dadosAtor.length > 0){

                    let sexoJSON = await sexoDAO.selectByIdSexo(dadosAtor[0].sexo_id)
                    dadosAtor[0].sexo = sexoJSON
                    console.log(dadosAtor)
                    let nacionalidadeJSON = await nacionalidadeDAO.selectByIdNacionalidadeAtor(dadosAtor[0].id)
                
                    if(nacionalidadeJSON.length > 0){ 
                        dadosAtor[0].nacionalidade = nacionalidadeJSON
                        console.log(dadosAtor)
                    }

                atoresJSON.ator = dadosAtor
                atoresJSON.status_code = 200

            return atoresJSON //200
            }else{
                return message.ERROR_NOT_FOUND //400
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }


}

//Função para buscar um ator pelo nome.

const  getAtorNome = async function(nome){
    let nomeAtor = nome
    let atoresJSON = {}

    if(nomeAtor == '' || nomeAtor == undefined){
        return message.ERROR_INVALID
    }else{
        let dadosAtor = await atorDAO.selectByNomeAtor(nomeAtor)

        const promisse = dadosAtor.map(async(ator)=>{
            let sexoJSON = await sexoDAO.selectByIdSexo(ator.sexo_id)
            ator.sexo = sexoJSON
            let nacionalidadeJSON = await nacionalidadeDAO.selectByIdNacionalidade(ator.id)
           
            if(nacionalidadeJSON.length > 0){ 
                ator.nacionalidade = nacionalidadeJSON
            }
        })

        await Promise.all(promisse)

        if(dadosAtor){
            if(dadosAtor.length > 0){
                atoresJSON.filme = dadosAtor
                atoresJSON.status_code = 200

                return atoresJSON
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB
        }

    }
        
}

//Função para inserir um novo ator no banco de dados.

const setInserirNovoAtor = async function (dadosAtor, contentType){

    try {
            if(String(contentType).toLowerCase() == 'application/json'){
                let dadosAtualizados = {}
                console.log(dadosAtor)
            
            // Validação para verificar campos obrigatórios e consistencia de dados
            if( dadosAtor.nome             == '' || dadosAtor.nome              == undefined || dadosAtor.nome.length               > 100       ||
                dadosAtor.data_nascimento  == '' || dadosAtor.data_nascimento   == undefined || dadosAtor.data_nascimento.length    > 10        ||
                dadosAtor.foto             == '' || dadosAtor.foto              == undefined || dadosAtor.foto.length               > 600       ||
                dadosAtor.biografia        == '' || dadosAtor.biografia         == undefined || dadosAtor.biografia.length          > 65000     ||
                dadosAtor.sexo_id          == '' || dadosAtor.sexo_id           == undefined || dadosAtor.sexo_id.length            > 1      
            ){  
                return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorreto
            }else{
                let dadosValidated = false

                //Validação de digitação para a data de falecimento que não é campo obrigatório
                if(     dadosAtor.data_falecimento != null && 
                        dadosAtor.data_falecimento != undefined && 
                        dadosAtor.data_falecimento != ""
                    ){
                        if(dadosAtor.data_falecimento.length != 10)
                            return message.ERROR_REQUIRED_FIELDS // 400 Campos origatórios / Incorretos
                        else
                            dadosValidated = true // Se a data estiver exatamente 10 char
                }else{
                    //Variável para validar se poderemos chamar o DAO 
                    dadosValidated = true // Se a data não existir nos dados
                }

            
                if(dadosValidated){
                    
                        //Encaminha os dados para o DAO inserir no BD
                        let novoAtor = await atorDAO.insertAtor(dadosAtor)

                    //Validação para verificar se os dados foram inseridos pelo DAO no BD
                    if(novoAtor){
                       
                    let idAtor = await atorDAO.selectUltimoId()                     

                        dadosAtor.id = Number(idAtor[0].id)
                        //Cria o padrão JSON para retorno dos dados criados no BD
                        dadosAtualizados.status         = message.SUCESS_CREATED_ITEM.status;
                        dadosAtualizados.status_code    = message.SUCESS_CREATED_ITEM.status_code;
                        dadosAtualizados.message        = message.SUCESS_CREATED_ITEM.message
                        dadosAtualizados.ator           = dadosAtor
            
                       
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

//Função para atualizar um ator existente.

const setAtualizarAtor = async (id, contentType, dadosAtor) =>{
    try {

        let idAtor = id; 

        if (idAtor == '' || idAtor == null || idAtor == isNaN(idAtor)) {
            return message.ERROR_INVALID_ID
        } else {

            if(String(contentType).toLowerCase() == 'application/json'){
                let resultDadosAtor = {}
                
                // Validação para verificar campos obrigatórios e consistencia de dados
                if( dadosAtor.nome             == '' || dadosAtor.nome              == undefined || dadosAtor.nome.length               > 100       ||
                    dadosAtor.data_nascimento  == '' || dadosAtor.data_nascimento   == undefined || dadosAtor.data_nascimento.length    > 10        ||
                    dadosAtor.foto             == '' || dadosAtor.foto              == undefined || dadosAtor.foto .length              > 600       ||
                    dadosAtor.biografia        == '' || dadosAtor.biografia         == undefined || dadosAtor.biografia .length         > 65000     ||
                    dadosAtor.sexo_id          == '' || dadosAtor.sexo_id           == undefined || dadosAtor.sexo_id.length            > 1  
                ){

                    return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorreto
                }else{
                    let dadosValidated = false

                    //Validação de digitação para a data de falecimento que não é campo obrigatório
                    if(     dadosAtor.data_falecimento != null && 
                            dadosAtor.data_falecimento != undefined && 
                            dadosAtor.data_falecimento != ""
                        ){
                            if(dadosAtor.data_falecimento.length != 10)
                                return message.ERROR_REQUIRED_FIELDS // 400 Campos origatórios / Incorretos
                            else
                                dadosValidated = true // Se a dataestiver exatamente 10 char
                    }else{
                        //Variável para validar se poderemos chamar o DAO 
                        dadosValidated = true // Se a data não existir nos dados
                    }

                    if(dadosValidated){
                        
                            //Encaminha os dados para o DAO inserir no BD
                            let novoAtor = await atorDAO.updateAtor(id, dadosAtor)

                        //Validação para verificar se os dados foram inseridos pelo DAO no BD
                        if(novoAtor){

                            let idAtor = await atorDAO.selectUltimoId()
                            
                            dadosAtor.id = Number(idAtor[0].id)

                            //Cria o padrão JSON para retorno dos dados criados no BD
                            resultDadosAtor.status         = message.SUCESS_CREATED_ITEM.status;
                            resultDadosAtor.status_code    = message.SUCESS_CREATED_ITEM.status_code;
                            resultDadosAtor.message        = message.SUCESS_CREATED_ITEM.message
                            resultDadosAtor.ator           = dadosAtor
                
                            return resultDadosAtor // 201
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

//Função para excluir um ator existente.

const setExcluirAtor = async function(id){

    try { 

        let idAtor = id
   
        if(idAtor == '' || idAtor == undefined || isNaN(idAtor)){
            return message.ERROR_INVALID_ID
        }else{
            

            let chamarConst = await atorDAO.selectByIdAtor(idAtor)

            if(chamarConst.length > 0){

                let dadosAtor = await atorDAO.deleteAtor(id)
              
                if(dadosAtor){

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

module.exports = {
    getAtor,
    getAtorNome,
    getListarAtores,
    setInserirNovoAtor,
    setAtualizarAtor,
    setExcluirAtor
}